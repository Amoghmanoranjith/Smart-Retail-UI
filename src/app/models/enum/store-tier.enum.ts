export enum StoreTier {
  TIER_1 = 'TIER_1',
  TIER_2 = 'TIER_2'
}

export const STORE_TIER_OPTIONS: ReadonlyArray<{ value: StoreTier; label: string }> = [
  { value: StoreTier.TIER_1, label: 'Tier 1' },
  { value: StoreTier.TIER_2, label: 'Tier 2' }
];
