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
  
  // Gráfico de líneas
  export const getInstalledCapacityForLineChart = (data: EnergyData[]): {
    labels: number[];
    wind: number[];
    solar: number[];
    geothermal: number[];
  } => {
    const years = getUniqueValues(data, 'Year') as number[];
    return {
      labels: years,
      wind: years.map((year) =>
        toNumber(data.find((item) => toNumber(item.Year) === year)?.['Wind Capacity'])
      ),
      solar: years.map((year) =>
        toNumber(data.find((item) => toNumber(item.Year) === year)?.['Solar Capacity'])
      ),
      geothermal: years.map((year) =>
        toNumber(data.find((item) => toNumber(item.Year) === year)?.['Geothermal Capacity'])
      ),
    };
  };
  
  // Gráfico de área
  export const getEnergyConsumptionComparisonForAreaChart = (data: EnergyData[]): {
    labels: number[];
    renewable: number[];
    conventional: number[];
  } => {
    const years = getUniqueValues(data, 'Year') as number[];
    return {
      labels: years,
      renewable: years.map((year) =>
        toNumber(data.find((item) => toNumber(item.Year) === year)?.['Geo Biomass Other - TWh'])
      ),
      conventional: years.map((year) =>
        toNumber(data.find((item) => toNumber(item.Year) === year)?.['Conventional Energy Consumption (TWh)'])
      ),
    };
  };
  