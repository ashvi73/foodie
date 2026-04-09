import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  Briefcase,
  CheckCircle,
  Home,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Plus,
  Save,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import type { Address, UserProfile } from "../backend.d";
import { Layout } from "../components/Layout";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Modal } from "../components/Modal";
import { useAuth } from "../hooks/useAuth";

// ── address tag config ──────────────────────────────────────────────────
const TAG_ICONS: Record<string, React.ReactNode> = {
  Home: <Home className="w-4 h-4" />,
  Work: <Briefcase className="w-4 h-4" />,
  Other: <MoreHorizontal className="w-4 h-4" />,
};
const TAG_OPTIONS = ["Home", "Work", "Other"];

type AddressFormState = {
  tag: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
};

const emptyAddress: AddressFormState = {
  tag: "Home",
  street: "",
  city: "",
  state: "",
  postalCode: "",
};

// ── sub-components ───────────────────────────────────────────────────────
function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="w-20 h-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>
      </div>
      <Skeleton className="h-48 w-full rounded-2xl" />
      <Skeleton className="h-32 w-full rounded-2xl" />
    </div>
  );
}

function AddressCard({
  address,
  index,
  isDefault,
  onDelete,
  onSetDefault,
}: {
  address: Address;
  index: number;
  isDefault: boolean;
  onDelete: (idx: number) => void;
  onSetDefault: (idx: number) => void;
}) {
  return (
    <div
      data-ocid={`address-card-${index}`}
      className={`relative bg-card rounded-2xl border p-5 transition-smooth hover:shadow-md ${
        isDefault ? "border-primary/50 shadow-sm" : "border-border"
      }`}
    >
      {isDefault && (
        <div className="absolute top-3 right-3">
          <Badge
            variant="secondary"
            className="text-xs px-2 py-0.5 bg-primary/10 text-primary border-primary/30"
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            Default
          </Badge>
        </div>
      )}
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: "var(--gradient-primary)" }}
        >
          <span className="text-primary-foreground">
            {TAG_ICONS[address.tag] ?? <MoreHorizontal className="w-4 h-4" />}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground text-sm">{address.tag}</p>
          <p className="text-muted-foreground text-sm mt-0.5 truncate">
            {address.street}
          </p>
          <p className="text-muted-foreground text-sm">
            {address.city}, {address.state} {address.postalCode}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
        {!isDefault && (
          <button
            type="button"
            onClick={() => onSetDefault(index)}
            data-ocid={`set-default-${index}`}
            className="text-xs text-primary font-medium hover:underline transition-colors"
          >
            Set as Default
          </button>
        )}
        <div className="flex gap-2 ml-auto">
          <button
            type="button"
            onClick={() => onDelete(index)}
            data-ocid={`delete-address-${index}`}
            className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-smooth"
            aria-label="Delete address"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── main page ────────────────────────────────────────────────────────────
export default function Profile() {
  const { isAuthenticated, isLoading: authLoading, principal } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { actor, isFetching: actorLoading } = useActor(createActor);

  // Redirect if not auth
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isAuthenticated, authLoading, navigate]);

  // ── queries ──────────────────────────────────────────────────────────
  const { data: profile, isLoading: profileLoading } =
    useQuery<UserProfile | null>({
      queryKey: ["userProfile"],
      queryFn: async () => {
        if (!actor) return null;
        return actor.getCallerUserProfile();
      },
      enabled: !!actor && !actorLoading && isAuthenticated,
    });

  // ── profile form state ───────────────────────────────────────────────
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [profileDirty, setProfileDirty] = useState(false);

  useEffect(() => {
    if (profile) {
      setProfileForm({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
      });
    }
  }, [profile]);

  // ── address modal state ──────────────────────────────────────────────
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [addressForm, setAddressForm] =
    useState<AddressFormState>(emptyAddress);
  const [defaultIndex, setDefaultIndex] = useState(0);

  // ── mutations ────────────────────────────────────────────────────────
  const saveProfileMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      await actor.saveCallerUserProfile({
        name: profileForm.name,
        email: profileForm.email,
        phone: profileForm.phone,
      });
    },
    onSuccess: () => {
      toast.success("Profile saved successfully!");
      setProfileDirty(false);
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: () => toast.error("Failed to save profile. Please try again."),
  });

  const addAddressMutation = useMutation({
    mutationFn: async (addr: AddressFormState) => {
      if (!actor) throw new Error("Not connected");
      await actor.addDeliveryAddress({
        tag: addr.tag,
        street: addr.street,
        city: addr.city,
        state: addr.state,
        postalCode: addr.postalCode,
      });
    },
    onSuccess: () => {
      toast.success("Address added!");
      setAddressModalOpen(false);
      setAddressForm(emptyAddress);
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: () => toast.error("Failed to add address."),
  });

  const removeAddressMutation = useMutation({
    mutationFn: async (index: number) => {
      if (!actor) throw new Error("Not connected");
      await actor.removeDeliveryAddress(BigInt(index));
    },
    onSuccess: () => {
      toast.success("Address removed.");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: () => toast.error("Failed to remove address."),
  });

  // ── helpers ──────────────────────────────────────────────────────────
  function getInitials(name: string) {
    return (
      name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "?"
    );
  }

  const isLoading = authLoading || profileLoading || actorLoading;
  const addresses: Address[] = profile?.savedAddresses ?? [];

  if (!isAuthenticated && !authLoading) return null;

  return (
    <Layout>
      <div className="bg-muted/30 min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          {isLoading ? (
            <ProfileSkeleton />
          ) : (
            <div className="space-y-6 slide-up">
              {/* ── Profile header card ── */}
              <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <div
                  className="h-24 w-full"
                  style={{
                    background: "var(--gradient-primary)",
                    opacity: 0.85,
                  }}
                />
                <div className="px-6 pb-6">
                  <div className="flex items-end gap-4 -mt-10">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-lg border-4 border-card flex-shrink-0"
                      style={{ background: "var(--gradient-primary)" }}
                    >
                      {getInitials(
                        profile?.name || principal?.slice(0, 4) || "?",
                      )}
                    </div>
                    <div className="pb-1 min-w-0">
                      <h1 className="font-display text-xl font-bold text-foreground truncate">
                        {profile?.name || "Set up your profile"}
                      </h1>
                      <p className="text-sm text-muted-foreground truncate">
                        {profile?.email || "No email set"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Profile form ── */}
              <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
                <h2 className="font-display text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="profile-name"
                      className="text-sm font-medium"
                    >
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="profile-name"
                        data-ocid="profile-name-input"
                        value={profileForm.name}
                        onChange={(e) => {
                          setProfileForm((p) => ({
                            ...p,
                            name: e.target.value,
                          }));
                          setProfileDirty(true);
                        }}
                        className="pl-10"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="profile-email"
                      className="text-sm font-medium"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="profile-email"
                        data-ocid="profile-email-input"
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => {
                          setProfileForm((p) => ({
                            ...p,
                            email: e.target.value,
                          }));
                          setProfileDirty(true);
                        }}
                        className="pl-10"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <Label
                      htmlFor="profile-phone"
                      className="text-sm font-medium"
                    >
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="profile-phone"
                        data-ocid="profile-phone-input"
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => {
                          setProfileForm((p) => ({
                            ...p,
                            phone: e.target.value,
                          }));
                          setProfileDirty(true);
                        }}
                        className="pl-10"
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <Button
                    onClick={() => saveProfileMutation.mutate()}
                    disabled={!profileDirty || saveProfileMutation.isPending}
                    data-ocid="save-profile-btn"
                    className="btn-gradient rounded-xl px-6"
                  >
                    {saveProfileMutation.isPending ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  {profileDirty && (
                    <button
                      type="button"
                      onClick={() => {
                        setProfileForm({
                          name: profile?.name ?? "",
                          email: profile?.email ?? "",
                          phone: profile?.phone ?? "",
                        });
                        setProfileDirty(false);
                      }}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Discard
                    </button>
                  )}
                </div>
              </div>

              {/* ── Delivery addresses ── */}
              <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Saved Addresses
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAddressModalOpen(true)}
                    data-ocid="add-address-btn"
                    className="gap-2 border-primary/30 text-primary hover:bg-primary/5"
                  >
                    <Plus className="w-4 h-4" />
                    Add New
                  </Button>
                </div>

                {addresses.length === 0 ? (
                  <div
                    data-ocid="addresses-empty-state"
                    className="text-center py-10 rounded-xl bg-muted/50 border border-dashed border-border"
                  >
                    <MapPin className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="font-medium text-foreground mb-1">
                      No saved addresses
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add a delivery address to check out faster.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAddressModalOpen(true)}
                      className="gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Address
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addresses.map((addr, idx) => (
                      <AddressCard
                        key={`${addr.street}-${idx}`}
                        address={addr}
                        index={idx}
                        isDefault={idx === defaultIndex}
                        onDelete={(i) => removeAddressMutation.mutate(i)}
                        onSetDefault={(i) => setDefaultIndex(i)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Add Address Modal ── */}
      <Modal
        isOpen={addressModalOpen}
        onClose={() => {
          setAddressModalOpen(false);
          setAddressForm(emptyAddress);
        }}
        title="Add New Address"
        size="md"
      >
        <div className="space-y-4">
          {/* Tag selector */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Address Type</Label>
            <div className="flex gap-2">
              {TAG_OPTIONS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  data-ocid={`address-tag-${tag.toLowerCase()}`}
                  onClick={() => setAddressForm((p) => ({ ...p, tag }))}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-sm font-medium transition-smooth ${
                    addressForm.tag === tag
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {TAG_ICONS[tag]}
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Street */}
          <div className="space-y-1.5">
            <Label htmlFor="addr-street" className="text-sm font-medium">
              Street Address
            </Label>
            <Input
              id="addr-street"
              data-ocid="addr-street-input"
              value={addressForm.street}
              onChange={(e) =>
                setAddressForm((p) => ({ ...p, street: e.target.value }))
              }
              placeholder="123 Main Street, Apt 4B"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* City */}
            <div className="space-y-1.5">
              <Label htmlFor="addr-city" className="text-sm font-medium">
                City
              </Label>
              <Input
                id="addr-city"
                data-ocid="addr-city-input"
                value={addressForm.city}
                onChange={(e) =>
                  setAddressForm((p) => ({ ...p, city: e.target.value }))
                }
                placeholder="Mumbai"
              />
            </div>
            {/* State */}
            <div className="space-y-1.5">
              <Label htmlFor="addr-state" className="text-sm font-medium">
                State
              </Label>
              <Input
                id="addr-state"
                data-ocid="addr-state-input"
                value={addressForm.state}
                onChange={(e) =>
                  setAddressForm((p) => ({ ...p, state: e.target.value }))
                }
                placeholder="Maharashtra"
              />
            </div>
          </div>

          {/* Postal code */}
          <div className="space-y-1.5">
            <Label htmlFor="addr-postal" className="text-sm font-medium">
              Postal Code
            </Label>
            <Input
              id="addr-postal"
              data-ocid="addr-postal-input"
              value={addressForm.postalCode}
              onChange={(e) =>
                setAddressForm((p) => ({ ...p, postalCode: e.target.value }))
              }
              placeholder="400001"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setAddressModalOpen(false);
                setAddressForm(emptyAddress);
              }}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 btn-gradient"
              data-ocid="save-address-btn"
              disabled={
                !addressForm.street ||
                !addressForm.city ||
                !addressForm.state ||
                !addressForm.postalCode ||
                addAddressMutation.isPending
              }
              onClick={() => addAddressMutation.mutate(addressForm)}
            >
              {addAddressMutation.isPending ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Address
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
}
