
export interface RenewableData {
  Entity: string;
  Code: string;
  Year: number;
  'Electricity from wind (TWh)': number;
  'Electricity from hydro (TWh)': number;
  'Electricity from solar (TWh)': number;
  'Other renewables including bioenergy (TWh)': number;
}

export const parseCSV = async (filePath: string): Promise<RenewableData[]> => {
  try {
    const response = await fetch(filePath);
    const text = await response.text();
    
    const rows = text.split('\n');
    const headers = rows[0].split(',');
    
    return rows.slice(1).map(row => {
      const values = row.split(',');
      const entry: any = {};
      
      headers.forEach((header, index) => {
        entry[header.trim()] = header.includes('Year') ? 
          parseInt(values[index], 10) : 
          isNaN(Number(values[index])) ? 
            values[index] : 
            parseFloat(values[index]);
      });
      
      return entry as RenewableData;
    }).filter(entry => entry.Entity && entry.Year);
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return [];
  }
};