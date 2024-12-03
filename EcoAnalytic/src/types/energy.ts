export interface EnergyData {
    year: number;
    country: string;
    solarGeneration: number;
    windGeneration: number;
    hydroGeneration: number;
    geoBiomassOther: number;
  }
  
  export interface CalculationResult {
    totalRenewable: number;
    percentage: number;
    breakdown: {
      solar: number;
      wind: number;
      hydro: number;
      other: number;
    };
  }