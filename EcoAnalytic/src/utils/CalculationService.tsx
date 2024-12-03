// Interfaz para EnergyData
export interface EnergyData {
    Entity: string;
    Code?: string;
    Year: number | string;
    [key: string]: any; // Para columnas dinámicas
  }
  
  // Convertir un valor a número
  const toNumber = (value: unknown): number => {
    return isNaN(Number(value)) ? 0 : Number(value);
  };
  
  // Obtener valores únicos de una columna
  export const getUniqueValues = (data: EnergyData[], column: string): Array<string | number> => {
    return Array.from(new Set(data.map((item) => item[column])))
      .map((value: string | number) => (column === 'Year' ? toNumber(value) : value))
      .filter((value: string | number) => value);
  };
  
  // Filtrar datos por región y año
  export const filterData = (data: EnergyData[], region: string, year: number): EnergyData[] => {
    return data.filter((item) => item.Entity === region && toNumber(item.Year) === year);
  };

  export const filterDataLi = (data: EnergyData[], region: string): EnergyData[] => {
    return data.filter((item) => item.Entity === region); // Filtra por región sin importar el año
  };
  
  // Obtener las regiones únicas
  export const getUniqueRegions = (data: EnergyData[]): string[] => {
    return getUniqueValues(data, 'Entity') as string[];
  };
  
  // Obtener los años únicos
  export const getUniqueYears = (data: EnergyData[]): number[] => {
    return getUniqueValues(data, 'Year') as number[];
  };
  
  // Métodos para gráficos
  
  // Gráfico de barras
  export const getProductionDataForBarChart = (data: EnergyData[]): number[] => {
    return [
      toNumber(data.find((item) => item['Electricity from wind (TWh)'])?.['Electricity from wind (TWh)']),
      toNumber(data.find((item) => item['Electricity from solar (TWh)'])?.['Electricity from solar (TWh)']),
      toNumber(data.find((item) => item['Electricity from hydro (TWh)'])?.['Electricity from hydro (TWh)']),
      toNumber(data.find((item) => item['Biofuels Production - TWh - Total'])?.['Biofuels Production - TWh - Total']),
      toNumber(data.find((item) => item['Geothermal Capacity'])?.['Geothermal Capacity']),
    ];
  };
  
  // Gráfico de pastel
  export const getRenewablesShareForPieChart = (data: EnergyData[]): number[] => {
    const windEnergy = data
      .filter((item) => item['Electricity from wind (TWh)'])
      .reduce((sum, item) => sum + toNumber(item['Electricity from wind (TWh)']), 0);
  
    const solarEnergy = data
      .filter((item) => item['Electricity from solar (TWh)'])
      .reduce((sum, item) => sum + toNumber(item['Electricity from solar (TWh)']), 0);
  
    const hydroEnergy = data
      .filter((item) => item['Electricity from hydro (TWh)'])
      .reduce((sum, item) => sum + toNumber(item['Electricity from hydro (TWh)']), 0);
  
    return [windEnergy, solarEnergy, hydroEnergy];
  };
  
 // Gráfico de líneas (modificado)
 export const getInstalledCapacityForLineChart = (data: EnergyData[]): {
  labels: string[]; // Regiones
  wind: number[];
  solar: number[];
  geothermal: number[];
} => {
  const regions = getUniqueValues(data, 'Entity') as string[];

  const wind = regions.map((region) =>
    data
      .filter((item) => item.Entity === region && item['Wind Capacity'])
      .reduce((sum, item) => sum + toNumber(item['Wind Capacity']), 0)
  );

  const solar = regions.map((region) =>
    data
      .filter((item) => item.Entity === region && item['Solar Capacity'])
      .reduce((sum, item) => sum + toNumber(item['Solar Capacity']), 0)
  );

  const geothermal = regions.map((region) =>
    data
      .filter((item) => item.Entity === region && item['Geothermal Capacity'])
      .reduce((sum, item) => sum + toNumber(item['Geothermal Capacity']), 0)
  );

  return {
    labels: regions,
    wind,
    solar,
    geothermal,
  };
};



// Gráfico de área (modificado)
export const getEnergyConsumptionComparisonForAreaChart = (data: EnergyData[]): {
  labels: string[]; // Labels ahora son strings (regiones)
  renewable: number[];
  conventional: number[];
} => {
  const regions = getUniqueValues(data, 'Entity') as string[];
  return {
    labels: regions,
    renewable: regions.map((region) =>
      toNumber(data.find((item) => item.Entity === region)?.['Geo Biomass Other - TWh'])
    ),
    conventional: regions.map((region) =>
      toNumber(data.find((item) => item.Entity === region)?.['Conventional Energy Consumption (TWh)'])
    ),
  };
};