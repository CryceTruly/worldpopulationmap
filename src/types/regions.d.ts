const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"] as const;

export type RegionsType = typeof REGIONS[number];

export default REGIONS;
