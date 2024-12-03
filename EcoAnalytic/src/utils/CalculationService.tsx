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

  
  export const getInstalledCapacityForLineChart = (data: EnergyData[]): {
    labels: number[]; // Años
    wind: number[];
    solar: number[];
    geothermal: number[];
  } => {
    const capacityMap = data.reduce((acc, item) => {
      const year = toNumber(item.Year);
      if (!acc[year]) {
        acc[year] = { wind: 0, solar: 0, geothermal: 0 };
      }
      if (item['Wind Capacity']) acc[year].wind += toNumber(item['Wind Capacity']);
      if (item['Solar Capacity']) acc[year].solar += toNumber(item['Solar Capacity']);
      if (item['Geothermal Capacity']) acc[year].geothermal += toNumber(item['Geothermal Capacity']);
      return acc;
    }, {} as Record<number, { wind: number; solar: number; geothermal: number }>);
  
    const labels = Object.keys(capacityMap).map((year) => parseInt(year));
    const wind = labels.map((year) => capacityMap[year].wind);
    const solar = labels.map((year) => capacityMap[year].solar);
    const geothermal = labels.map((year) => capacityMap[year].geothermal);
  
    return { labels, wind, solar, geothermal };
  };
  
  export const getEnergyConsumptionComparisonForAreaChart = (data: EnergyData[]): {
    labels: number[]; // Años
    renewable: number[];
    conventional: number[];
  } => {
    const consumptionMap = data.reduce((acc, item) => {
      const year = toNumber(item.Year);
      if (!acc[year]) {
        acc[year] = { renewable: 0, conventional: 0 };
      }
      if (item['Geo Biomass Other - TWh']) acc[year].renewable += toNumber(item['Geo Biomass Other - TWh']);
      if (item['Conventional Energy Consumption (TWh)']) acc[year].conventional += toNumber(item['Conventional Energy Consumption (TWh)']);
      return acc;
    }, {} as Record<number, { renewable: number; conventional: number }>);
  
    const labels = Object.keys(consumptionMap).map((year) => parseInt(year));
    const renewable = labels.map((year) => consumptionMap[year].renewable);
    const conventional = labels.map((year) => consumptionMap[year].conventional);
  
    return { labels, renewable, conventional };
  };
  