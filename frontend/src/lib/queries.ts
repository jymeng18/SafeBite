/**
 * React Query hooks for SafeBite API
 */

import { useQuery } from "@tanstack/react-query";
import {
  getRestaurants,
  searchLocation,
  reverseGeocode,
  healthCheck,
  type GetRestaurantsParams,
} from "./api";

// Query keys for caching
export const queryKeys = {
  restaurants: (params: GetRestaurantsParams) => ["restaurants", params] as const,
  geocode: (query: string) => ["geocode", query] as const,
  reverseGeocode: (lat: number, lon: number) => ["reverseGeocode", lat, lon] as const,
  health: ["health"] as const,
};

// Restaurant hooks
export function useRestaurants(params: GetRestaurantsParams, enabled = true) {
  return useQuery({
    queryKey: queryKeys.restaurants(params),
    queryFn: () => getRestaurants(params),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    select: (data) => data.data ?? [],
  });
}

// Geocoding hooks
export function useGeocode(query: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.geocode(query),
    queryFn: () => searchLocation(query),
    enabled: enabled && query.length > 2,
    staleTime: 30 * 60 * 1000, // 30 minutes
    select: (data) => data.data ?? [],
  });
}

export function useReverseGeocode(
  lat: number | undefined,
  lon: number | undefined,
  enabled = true
) {
  return useQuery({
    queryKey: queryKeys.reverseGeocode(lat ?? 0, lon ?? 0),
    queryFn: () => reverseGeocode(lat!, lon!),
    enabled: enabled && lat !== undefined && lon !== undefined,
    staleTime: 60 * 60 * 1000, // 1 hour
    select: (data) => data.data,
  });
}

// Health check hook
export function useHealthCheck(enabled = true) {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: healthCheck,
    enabled,
    refetchInterval: 30 * 1000, // 30 seconds
  });
}
