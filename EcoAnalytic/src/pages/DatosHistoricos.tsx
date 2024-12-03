import React, { useState, useEffect } from 'react';
import { parseCSV, RenewableData } from '../utils/csvParser';
import { DataTable } from '../components/DatosHistoricos';
import { Filters } from '../components/Filters';
import { Pagination } from '../components/Pagination';
import '../styles/DatosHistoricos.css';

export const DatosHistoricos: React.FC = () => {
  const [data, setData] = useState<RenewableData[]>([]);
  const [filteredData, setFilteredData] = useState<RenewableData[]>([]);
  const [selectedEntity, setSelectedEntity] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 50;

  useEffect(() => {
    const loadData = async () => {
      const csvData = await parseCSV('/src/data/modern-renewable-prod.csv');
      setData(csvData);
      setFilteredData(csvData);
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    let filtered = [...data];
    
    if (selectedEntity) {
      filtered = filtered.filter(item => item.Entity === selectedEntity);
    }
    
    if (selectedYear) {
      filtered = filtered.filter(item => item.Year === parseInt(selectedYear));
    }
    
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [selectedEntity, selectedYear, data]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  if (isLoading) {
    return (
      <div className='homeD'>
        <div></div>
      </div>
    );
  }

  return (
    <div className='homeD'>
      <h1>Datos Históricos de Energías Renovables</h1>
      
      <Filters
        data={data}
        selectedEntity={selectedEntity}
        selectedYear={selectedYear}
        onEntityChange={setSelectedEntity}
        onYearChange={setSelectedYear}
      />
      
      <DataTable
        data={filteredData}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default DatosHistoricos;