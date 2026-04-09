import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Navigate } from "@tanstack/react-router";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Loader2,
  MapPin,
  Plus,
  ShoppingBag,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { createActor } from "../backend";
import type { Address } from "../backend";
import { Layout } from "../components/Layout";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";

const TAX_RATE = 0.1;
const DELIVERY_FEE = 49;

type AddressTag = "Home" | "Work" | "Other";

interface NewAddressForm {
  tag: AddressTag;
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

const TAG_COLORS: Record<AddressTag, string> = {
  Home: "bg-primary/10 text-primary border-primary/30",
  Work: "bg-secondary/10 text-secondary border-secondary/30",
  Other: "bg-muted text-muted-foreground border-border",
};

export default function Checkout() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { items, cartTotal, isEmpty } = useCart();
  const { actor, isFetching: actorLoading } = useActor(createActor);

  const [selectedAddressIdx, setSelectedAddressIdx] = useState<number | null>(
    null,
  );
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const [newAddress, setNewAddress] = useState<NewAddressForm>({
    tag: "Home",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const subtotal = cartTotal;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + DELIVERY_FEE + tax;

  // Fetch user profile for saved addresses
  const { data: profile, refetch: refetchProfile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorLoading && isAuthenticated,
  });

  const savedAddresses: Address[] = profile?.savedAddresses ?? [];

  // Add new address mutation
  const addAddressMutation = useMutation({
    mutationFn: async (address: Address) => {
      if (!actor) throw new Error("No actor");
      await actor.addDeliveryAddress(address);
    },
    onSuccess: async () => {
      await refetchProfile();
      setShowNewAddressForm(false);
      setNewAddress({
        tag: "Home",
        street: "",
        city: "",
        state: "",
        postalCode: "",
      });
      const newIdx = profile?.savedAddresses.length ?? 0;
      setSelectedAddressIdx(newIdx);
    },
  });

  // Checkout mutation
  const checkoutMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");

      const selectedAddr =
        selectedAddressIdx !== null ? savedAddresses[selectedAddressIdx] : null;
      if (!selectedAddr) throw new Error("No address selected");

      const shoppingItems = items.map((item) => ({
        productName: item.name,
        productDescription: item.name,
        currency: "inr",
        quantity: BigInt(item.quantity),
        priceInCents: BigInt(Math.round(item.price * 100)),
      }));

      const origin = window.location.origin;
      const sessionId = await actor.createCheckoutSession(
        shoppingItems,
        `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        `${origin}/cart`,
      );
      return sessionId;
    },
    onSuccess: (sessionId) => {
      setIsRedirecting(true);
      const selectedAddr =
        selectedAddressIdx !== null ? savedAddresses[selectedAddressIdx] : null;
      if (selectedAddr) {
        const addrString = `${selectedAddr.street}, ${selectedAddr.city}, ${selectedAddr.state} ${selectedAddr.postalCode}`;
        sessionStorage.setItem("foodie_delivery_address", addrString);
      }
      window.location.href = sessionId;
    },
  });

  const handleAddAddress = () => {
    if (
      !newAddress.street.trim() ||
      !newAddress.city.trim() ||
      !newAddress.state.trim() ||
      !newAddress.postalCode.trim()
    )
      return;

    addAddressMutation.mutate({
      tag: newAddress.tag,
      street: newAddress.street.trim(),
      city: newAddress.city.trim(),
      state: newAddress.state.trim(),
      postalCode: newAddress.postalCode.trim(),
    });
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="flex-1 flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isEmpty) {
    return <Navigate to="/cart" />;
  }

  return (
    <Layout>
      <div className="bg-muted/30 min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-1">
              <ShoppingBag className="w-6 h-6 text-primary" />
              <h1 className="font-display text-3xl font-bold text-foreground">
                Checkout
              </h1>
            </div>
            <p className="text-muted-foreground ml-9">
              Complete your order — just a few steps away!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Delivery + Instructions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden"
              >
                <div className="p-5 border-b border-border flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Delivery Address
                  </h2>
                </div>

                <div className="p-5 space-y-3">
                  {savedAddresses.length === 0 && !showNewAddressForm && (
                    <div className="text-center py-6">
                      <MapPin className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                      <p className="text-muted-foreground text-sm mb-4">
                        No saved addresses. Add one below.
                      </p>
                    </div>
                  )}

                  {/* Saved Address Radio Cards */}
                  {savedAddresses.map((addr, idx) => (
                    <button
                      key={`addr-${addr.tag}-${addr.street}-${idx}`}
                      type="button"
                      onClick={() => setSelectedAddressIdx(idx)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-smooth cursor-pointer ${
                        selectedAddressIdx === idx
                          ? "border-primary bg-primary/5"
                          : "border-border bg-muted/30 hover:border-primary/50"
                      }`}
                      data-ocid={`checkout-address-${idx}`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-smooth ${
                            selectedAddressIdx === idx
                              ? "border-primary bg-primary"
                              : "border-muted-foreground/40"
                          }`}
                        >
                          {selectedAddressIdx === idx && (
                            <Check className="w-3 h-3 text-primary-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${TAG_COLORS[addr.tag as AddressTag] ?? TAG_COLORS.Other}`}
                            >
                              {addr.tag}
                            </span>
                          </div>
                          <p className="text-foreground text-sm font-medium">
                            {addr.street}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {addr.city}, {addr.state} {addr.postalCode}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}

                  {/* Add New Address Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                    className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/50 transition-smooth text-sm font-medium text-muted-foreground hover:text-primary"
                    data-ocid="checkout-add-address-toggle"
                  >
                    <span className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add New Address
                    </span>
                    {showNewAddressForm ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {/* New Address Form */}
                  <AnimatePresence>
                    {showNewAddressForm && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2 space-y-4 border-t border-border">
                          {/* Tag selector */}
                          <div>
                            <Label className="text-sm font-medium text-foreground mb-2 block">
                              Address Type
                            </Label>
                            <div className="flex gap-2">
                              {(["Home", "Work", "Other"] as AddressTag[]).map(
                                (tag) => (
                                  <button
                                    key={tag}
                                    type="button"
                                    onClick={() =>
                                      setNewAddress((p) => ({ ...p, tag }))
                                    }
                                    className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-smooth ${
                                      newAddress.tag === tag
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-border bg-muted/30 text-muted-foreground hover:border-primary/50"
                                    }`}
                                    data-ocid={`checkout-tag-${tag}`}
                                  >
                                    {tag}
                                  </button>
                                ),
                              )}
                            </div>
                          </div>

                          <div>
                            <Label
                              htmlFor="street"
                              className="text-sm font-medium mb-1.5 block"
                            >
                              Street Address *
                            </Label>
                            <Input
                              id="street"
                              placeholder="123 Main Street, Apt 4B"
                              value={newAddress.street}
                              onChange={(e) =>
                                setNewAddress((p) => ({
                                  ...p,
                                  street: e.target.value,
                                }))
                              }
                              className="rounded-xl"
                              data-ocid="checkout-street"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label
                                htmlFor="city"
                                className="text-sm font-medium mb-1.5 block"
                              >
                                City *
                              </Label>
                              <Input
                                id="city"
                                placeholder="Mumbai"
                                value={newAddress.city}
                                onChange={(e) =>
                                  setNewAddress((p) => ({
                                    ...p,
                                    city: e.target.value,
                                  }))
                                }
                                className="rounded-xl"
                                data-ocid="checkout-city"
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor="state"
                                className="text-sm font-medium mb-1.5 block"
                              >
                                State *
                              </Label>
                              <Input
                                id="state"
                                placeholder="Maharashtra"
                                value={newAddress.state}
                                onChange={(e) =>
                                  setNewAddress((p) => ({
                                    ...p,
                                    state: e.target.value,
                                  }))
                                }
                                className="rounded-xl"
                                data-ocid="checkout-state"
                              />
                            </div>
                          </div>

                          <div>
                            <Label
                              htmlFor="postalCode"
                              className="text-sm font-medium mb-1.5 block"
                            >
                              Postal Code *
                            </Label>
                            <Input
                              id="postalCode"
                              placeholder="400001"
                              value={newAddress.postalCode}
                              onChange={(e) =>
                                setNewAddress((p) => ({
                                  ...p,
                                  postalCode: e.target.value,
                                }))
                              }
                              className="rounded-xl"
                              data-ocid="checkout-postal"
                            />
                          </div>

                          <Button
                            onClick={handleAddAddress}
                            disabled={
                              addAddressMutation.isPending ||
                              !newAddress.street.trim() ||
                              !newAddress.city.trim() ||
                              !newAddress.state.trim() ||
                              !newAddress.postalCode.trim()
                            }
                            className="w-full rounded-xl gap-2"
                            data-ocid="checkout-save-address"
                          >
                            {addAddressMutation.isPending ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <Plus className="w-4 h-4" />
                                Save Address
                              </>
                            )}
                          </Button>

                          {addAddressMutation.isError && (
                            <p className="text-destructive text-sm text-center">
                              Failed to save address. Please try again.
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Special Instructions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden"
              >
                <div className="p-5 border-b border-border">
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Special Instructions
                  </h2>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    Any dietary requirements or preferences?
                  </p>
                </div>
                <div className="p-5">
                  <Textarea
                    placeholder="e.g. No onions, extra spicy, ring the doorbell..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="rounded-xl resize-none min-h-[100px]"
                    data-ocid="checkout-special-instructions"
                  />
                </div>
              </motion.div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden sticky top-24"
                data-ocid="checkout-summary"
              >
                <div className="p-5 border-b border-border">
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Order Summary
                  </h2>
                </div>

                <div className="p-5">
                  {/* Items list */}
                  <div className="space-y-3 mb-4">
                    {items.map((item) => (
                      <div
                        key={item.menuItemId}
                        className="flex justify-between items-start gap-2"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ×{item.quantity} @ ₹{item.price}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-foreground flex-shrink-0">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2.5 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium text-foreground">
                        ₹{subtotal}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Delivery fee
                      </span>
                      <span className="font-medium text-foreground">
                        ₹{DELIVERY_FEE}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (10%)</span>
                      <span className="font-medium text-foreground">
                        ₹{tax}
                      </span>
                    </div>
                  </div>

                  <Separator className="mb-4" />

                  <div className="flex justify-between mb-6">
                    <span className="font-display font-bold text-foreground text-lg">
                      Total
                    </span>
                    <span className="font-display font-bold text-primary text-xl">
                      ₹{total}
                    </span>
                  </div>

                  {selectedAddressIdx === null && savedAddresses.length > 0 && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-xl px-3 py-2 mb-3 text-center">
                      ⚠️ Please select a delivery address
                    </p>
                  )}
                  {selectedAddressIdx === null &&
                    savedAddresses.length === 0 && (
                      <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-xl px-3 py-2 mb-3 text-center">
                        ⚠️ Please add a delivery address
                      </p>
                    )}

                  <Button
                    onClick={() => checkoutMutation.mutate()}
                    disabled={
                      checkoutMutation.isPending ||
                      isRedirecting ||
                      selectedAddressIdx === null ||
                      actorLoading
                    }
                    className="btn-gradient w-full rounded-full py-3 text-base gap-2"
                    data-ocid="checkout-pay-stripe"
                  >
                    {checkoutMutation.isPending || isRedirecting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {isRedirecting
                          ? "Redirecting..."
                          : "Creating session..."}
                      </>
                    ) : (
                      <>🔒 Pay ₹{total} with Stripe</>
                    )}
                  </Button>

                  {checkoutMutation.isError && (
                    <p className="text-destructive text-xs text-center mt-2">
                      Payment session failed. Please try again.
                    </p>
                  )}

                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Secured by Stripe. Your payment info is never stored.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
