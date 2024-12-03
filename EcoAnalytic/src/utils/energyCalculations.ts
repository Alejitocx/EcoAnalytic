import { EnergyData, CalculationResult } from '../types/energy';

export const calculateRenewablePercentage = (
  userConsumption: number,
  energyData: EnergyData
): CalculationResult => {
  
  const totalRenewable =
    energyData.solarGeneration +
    energyData.windGeneration +
    energyData.hydroGeneration +
    energyData.geoBiomassOther;

  const percentage = userConsumption / ( 1000 * 12);

  return {
    totalRenewable,
    percentage: (percentage * 1) / energyData.windGeneration,
    breakdown: {
      solar: (energyData.solarGeneration / totalRenewable) * 100,
      wind: (energyData.windGeneration / totalRenewable) * 100,
      hydro: (energyData.hydroGeneration / totalRenewable) * 100,
      other: (energyData.geoBiomassOther / totalRenewable) * 100,
    },
  };
};