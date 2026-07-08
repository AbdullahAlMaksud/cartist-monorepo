import type { BaseEntity, WithoutTimestamps } from "./entity";

/**
 * Generic repository contract. Every feature's mock (local storage) service
 * implements this same shape, so swapping to a real HTTP-backed service later
 * is a drop-in replacement with no call-site changes.
 */
export interface Repository<T extends BaseEntity, TCreateInput = WithoutTimestamps<T>> {
  list: () => Promise<T[]>;
  getById: (id: string) => Promise<T | null>;
  create: (input: TCreateInput) => Promise<T>;
  update: (id: string, input: Partial<TCreateInput>) => Promise<T>;
  remove: (id: string) => Promise<void>;
}

export interface ApiResult<T> {
  data: T;
  error: null;
}

export interface ApiError {
  data: null;
  error: {
    message: string;
    code?: string;
  };
}

export type ApiResponse<T> = ApiResult<T> | ApiError;
