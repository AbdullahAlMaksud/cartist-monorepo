export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type WithoutTimestamps<T extends BaseEntity> = Omit<
  T,
  "id" | "createdAt" | "updatedAt"
>;
