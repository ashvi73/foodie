import { d as useQueryClient } from "./index-DnwehUM6.js";
import { u as useQuery, a as useActor, c as createActor } from "./backend-C4anb5sy.js";
import { u as useMutation } from "./useMutation-DGCRxlfq.js";
function useBackend() {
  return useActor(createActor);
}
function useListRestaurants() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listRestaurants();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1e3 * 60 * 2
  });
}
function useSearchRestaurants(filter) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["restaurants", "search", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchRestaurants(filter);
    },
    enabled: !!actor && !isFetching && (!!filter.searchTerm || !!filter.category || !!filter.minRating),
    staleTime: 1e3 * 30
  });
}
function useGetRestaurant(id) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["restaurant", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getRestaurant(id);
    },
    enabled: !!actor && !isFetching && id !== null
  });
}
function useListMenuItems(restaurantId) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["menuItems", restaurantId == null ? void 0 : restaurantId.toString()],
    queryFn: async () => {
      if (!actor || restaurantId === null) return [];
      return actor.listMenuItems(restaurantId);
    },
    enabled: !!actor && !isFetching && restaurantId !== null
  });
}
function useGetRestaurantReviews(restaurantId) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["reviews", restaurantId == null ? void 0 : restaurantId.toString()],
    queryFn: async () => {
      if (!actor || restaurantId === null) return [];
      return actor.getRestaurantReviews(restaurantId);
    },
    enabled: !!actor && !isFetching && restaurantId !== null,
    staleTime: 3e4
  });
}
function useGetRestaurantRatingSummary(restaurantId) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["ratingSummary", restaurantId == null ? void 0 : restaurantId.toString()],
    queryFn: async () => {
      if (!actor || restaurantId === null) return null;
      return actor.getRestaurantRatingSummary(restaurantId);
    },
    enabled: !!actor && !isFetching && restaurantId !== null,
    staleTime: 3e4
  });
}
function useAddReview() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addReview(input);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.restaurantId.toString()]
      });
      queryClient.invalidateQueries({
        queryKey: ["ratingSummary", variables.restaurantId.toString()]
      });
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    }
  });
}
function useSeedData() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.seedData();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    }
  });
}
export {
  useSeedData as a,
  useSearchRestaurants as b,
  useGetRestaurant as c,
  useListMenuItems as d,
  useGetRestaurantReviews as e,
  useGetRestaurantRatingSummary as f,
  useAddReview as g,
  useListRestaurants as u
};
