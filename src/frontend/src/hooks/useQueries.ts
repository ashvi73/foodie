import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  AddReviewInput,
  MenuItem,
  Restaurant,
  RestaurantFilter,
  RestaurantRatingSummary,
  Review,
} from "../backend.d";

function useBackend() {
  return useActor(createActor);
}

export function useListRestaurants() {
  const { actor, isFetching } = useBackend();
  return useQuery<Restaurant[]>({
    queryKey: ["restaurants"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listRestaurants();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 2,
  });
}

export function useSearchRestaurants(filter: RestaurantFilter) {
  const { actor, isFetching } = useBackend();
  return useQuery<Restaurant[]>({
    queryKey: ["restaurants", "search", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchRestaurants(filter);
    },
    enabled:
      !!actor &&
      !isFetching &&
      (!!filter.searchTerm || !!filter.category || !!filter.minRating),
    staleTime: 1000 * 30,
  });
}

export function useGetRestaurant(id: bigint | null) {
  const { actor, isFetching } = useBackend();
  return useQuery<Restaurant | null>({
    queryKey: ["restaurant", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getRestaurant(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useListMenuItems(restaurantId: bigint | null) {
  const { actor, isFetching } = useBackend();
  return useQuery<MenuItem[]>({
    queryKey: ["menuItems", restaurantId?.toString()],
    queryFn: async () => {
      if (!actor || restaurantId === null) return [];
      return actor.listMenuItems(restaurantId);
    },
    enabled: !!actor && !isFetching && restaurantId !== null,
  });
}

export function useGetRestaurantReviews(restaurantId: bigint | null) {
  const { actor, isFetching } = useBackend();
  return useQuery<Review[]>({
    queryKey: ["reviews", restaurantId?.toString()],
    queryFn: async () => {
      if (!actor || restaurantId === null) return [];
      return actor.getRestaurantReviews(restaurantId);
    },
    enabled: !!actor && !isFetching && restaurantId !== null,
    staleTime: 30_000,
  });
}

export function useGetRestaurantRatingSummary(restaurantId: bigint | null) {
  const { actor, isFetching } = useBackend();
  return useQuery<RestaurantRatingSummary | null>({
    queryKey: ["ratingSummary", restaurantId?.toString()],
    queryFn: async () => {
      if (!actor || restaurantId === null) return null;
      return actor.getRestaurantRatingSummary(restaurantId);
    },
    enabled: !!actor && !isFetching && restaurantId !== null,
    staleTime: 30_000,
  });
}

export function useAddReview() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: AddReviewInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addReview(input);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.restaurantId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: ["ratingSummary", variables.restaurantId.toString()],
      });
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });
}

export function useSeedData() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.seedData();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });
}

// Legacy placeholder hook for backwards compat
export function useBackendStatus() {
  return useQuery<boolean>({
    queryKey: ["backend-status"],
    queryFn: async () => true,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
