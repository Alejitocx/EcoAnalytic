import { ChartData } from "chart.js";
import Papa, { ParseResult } from "papaparse";

const fetchCsvData = async (filePath: string): Promise<any[]> => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Error fetching ${filePath}: ${response.status} ${response.statusText}`);
    }
    const text = await response.text();
    return new Promise<any[]>((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        complete: (result: ParseResult<any>) => resolve(result.data), 
      });
    });
  } catch (error) {
    console.error(`Error fetching or parsing ${filePath}:`, error);
    throw error; // Re-lanza el error para que sea manejado más arriba
  }
};


export const getRenewableProductionData = async (
  year: number,
  country: string
): Promise<ChartData<"bar"> | null> => {
  const filePaths = [
    "../data/wind-generation.csv",
    "../data/solar-energy-consumption.csv",
    "../data/hydropower-consumption.csv",
    "../data/biofuel-production.csv",
    "../data/installed-geothermal-capacity.csv",
  ];

  try {
    const datasets = await Promise.all(filePaths.map(fetchCsvData));
    const data = datasets.flat();
    const filteredData = data.filter(
      (row) => parseInt(row.year, 10) === year && row.country === country
    );

    if (filteredData.length === 0) return null;

    const energyTypes = [
      { key: "wind", label: "Wind", bg: 'rgba(54, 162, 235, 0.6)', border: 'rgba(54, 162, 235, 1)' },
      { key: "solar", label: "Solar", bg: 'rgba(255, 99, 132, 0.6)', border: 'rgba(255, 99, 132, 1)' },
      { key: "hydro", label: "Hydropower", bg: 'rgba(255, 206, 86, 0.6)', border: 'rgba(255, 206, 86, 1)' },
      { key: "biofuel", label: "Biofuel", bg: 'rgba(75, 192, 192, 0.6)', border: 'rgba(75, 192, 192, 1)' },
      { key: "geothermal", label: "Geothermal", bg: 'rgba(153, 102, 255, 0.6)', border: 'rgba(153, 102, 255, 1)' },
    ];

    return {
      labels: energyTypes.map((type) => type.label),
      datasets: energyTypes.map((type) => ({
        label: type.label,
        data: filteredData.map((row) => parseFloat(row[type.key]) || 0),
        backgroundColor: type.bg,
        borderColor: type.border,
        borderWidth: 1,
      })),
    };
  } catch (error) {
    console.error("Error fetching renewable production data:", error);
    return null;
  }
};


export const getRenewableShareData = async (
  year: number,
  country: string
): Promise<ChartData | null> => {
  const filePaths = [
    "/data/share-electricity-renewables.csv",
    "/data/share-electricity-wind.csv",
    "/data/share-electricity-solar.csv",
    "/data/share-electricity-hydro.csv",
  ];

  try {
    const datasets = await Promise.all(filePaths.map(fetchCsvData));
    const data = datasets.flat();
    const filteredData = data.filter(
      (row) => parseInt(row.year, 10) === year && row.country === country
    );

    if (filteredData.length === 0) return null;

    const shareTypes = [
      { key: "renewables", label: "Renewables", color: 'rgba(54, 162, 235, 0.8)' },
      { key: "wind", label: "Wind", color: 'rgba(255, 99, 132, 0.8)' },
      { key: "solar", label: "Solar", color: 'rgba(255, 206, 86, 0.8)' },
      { key: "hydro", label: "Hydro", color: 'rgba(75, 192, 192, 0.8)' },
    ];

    return {
      labels: shareTypes.map((type) => type.label),
      datasets: [{
        data: shareTypes.map((type) =>
          filteredData.reduce((sum, row) => sum + (parseFloat(row[type.key]) || 0), 0)
        ),
        backgroundColor: shareTypes.map((type) => type.color),
        borderWidth: 1,
      }],
    };
  } catch (error) {
    console.error("Error fetching renewable share data:", error);
    return null;
  }
};


export const getInstalledCapacityTrend = async (
  year: number,
  country: string
): Promise<ChartData | null> => {
  const filePaths = [
    "/data/cumulative-installed-wind-energy-capacity-gigawatts.csv",
    "/data/installed-solar-PV-capacity.csv",
    "/data/installed-geothermal-capacity.csv",
  ];

  try {
    const datasets = await Promise.all(filePaths.map(fetchCsvData));
    const data = datasets.flat();
    const filteredData = data.filter(
      (row) => parseInt(row.year, 10) === year && row.country === country
    );

    if (filteredData.length === 0) return null;

    const capacityTypes = [
      { key: "wind", label: "Wind", color: { bg: 'rgba(54, 162, 235, 0.6)', border: 'rgba(54, 162, 235, 1)' } },
      { key: "solar", label: "Solar", color: { bg: 'rgba(255, 99, 132, 0.6)', border: 'rgba(255, 99, 132, 1)' } },
      { key: "geothermal", label: "Geothermal", color: { bg: 'rgba(75, 192, 192, 0.6)', border: 'rgba(75, 192, 192, 1)' } },
    ];

    return {
      labels: filteredData.map((row) => row.year),
      datasets: capacityTypes.map((type) => ({
        label: type.label,
        data: filteredData.map((row) => parseFloat(row[type.key]) || 0),
        backgroundColor: type.color.bg,
        borderColor: type.color.border,
        borderWidth: 1,
      })),
    };
  } catch (error) {
    console.error("Error fetching installed capacity trend data:", error);
    return null;
  }
};


export const getEnergyConsumptionComparison = async (
  country: string
): Promise<ChartData | null> => {
  const filePaths = ["/data/modern-renewable-energy-consumption.csv"];

  try {
    const datasets = await Promise.all(filePaths.map(fetchCsvData));
    const data = datasets.flat();
    const filteredData = data.filter((row) => row.country === country);

    if (filteredData.length === 0) return null;

    // Sort data by year
    filteredData.sort((a, b) => parseInt(a.year) - parseInt(b.year));

    return {
      labels: filteredData.map((row) => row.year),
      datasets: [
        {
          label: "Renewable Energy",
          data: filteredData.map((row) => parseFloat(row.renewable) || 0),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          fill: true,
        },
      ],
    };
  } catch (error) {
    console.error("Error fetching energy consumption comparison data:", error);
    return null;
  }
};