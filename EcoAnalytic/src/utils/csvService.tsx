
// Define las rutas de los archivos
const basePath = 'src/data/';

const csvPaths: { [key: string]: string[] } = {
  barChart: [
    `${basePath}modern-renewable-prod.csv`,
    `${basePath}biofuel-production.csv`,
    `${basePath}installed-geothermal-capacity.csv`,
  ],
  pieChart: [
    `${basePath}modern-renewable-prod.csv`,
    `${basePath}solar-energy-consumption.csv`,
    `${basePath}wind-generation.csv`,
    `${basePath}hydropower-consumption.csv`,
  ],
  lineChart: [
    `${basePath}cumulative-installed-wind-energy-capacity-gigawatts.csv`,
    `${basePath}installed-solar-PV-capacity.csv`,
    `${basePath}installed-geothermal-capacity.csv`,
  ],
  areaChart: [
    `${basePath}modern-renewable-energy-consumption.csv`,
    `${basePath}hydropower-consumption.csv`,
    `${basePath}wind-generation.csv`,
    `${basePath}solar-energy-consumption.csv`,
    `${basePath}biofuel-production.csv`,
  ],
};

// Función para cargar un archivo CSV específico
export async function getCsvData(fileName: string): Promise<any[]> {
  try {
    const response = await fetch(`${basePath}${fileName}`);
    if (!response.ok) throw new Error(`Error al cargar el archivo: ${fileName}`);

    const csvText = await response.text();
    return csvToJson(csvText);
  } catch (error) {
    console.error('Error:', error);
    return []; 
  }
}

// Función para cargar archivos CSV basados en el tipo de gráfico
export async function getCsvDataForChart(chartType: string): Promise<any[]> {
  const paths = csvPaths[chartType];
  if (!paths) return [];

  try {
    const fetchPromises = paths.map((path) => fetch(path).then((res) => res.text()));
    const responses = await Promise.all(fetchPromises);
    const allData = responses.flatMap((csvText) => csvToJson(csvText));
    return allData;
  } catch (error) {
    console.error('Error al cargar los archivos CSV:', error);
    return [];
  }
}

// Convertir CSV a JSON
function csvToJson(csv: string): any[] {
  const lines = csv.split('\n').filter((line) => line.trim().length > 0);
  const headers = lines[0].split(',').map((header) => header.trim());
  return lines.slice(1).map((line) => {
    const values = line.split(',').map((value) => value.trim());
    return headers.reduce((acc: { [key: string]: string | null }, header: string, index: number) => {
      acc[header] = values[index] || null;
      return acc;
    }, {});
  });
}
