"use client"

import { Select, SelectItem } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import React, { useState, useEffect } from 'react';
import { fetchTabla } from './data';

export default function Home() {

  const [dispositivos, setDispositivos] = useState([]);
  const [filtroMarca, setFiltroMarca] = useState("$.0");

  useEffect(() => {
    async function fetchData() {
      const dataDispositivos = await fetchTabla();
      setDispositivos(dataDispositivos);
    }
    fetchData();
  }, []);

  const handleMarcaChange = (event) => {
    const { value } = event.target
    setFiltroMarca(value);
    
  };

  const dispositivosFiltrados = filtroMarca === "$.0" ? dispositivos : dispositivos.filter(dispositivo => dispositivo.nom_marca === filtroMarca);

  return (
    <main className="container mx-auto flex flex-col gap-16">
      <h1 className="mx-auto mt-5 font-mono text-5xl">Inventario</h1>
      <div className="flex flex-row justify-between gap-4">
        
      <Select
          name="marca"
          label="Filtrar por Marca"
          className="max-w-xs"
          value={filtroMarca}
          onChange={handleMarcaChange}
        >
          <SelectItem value="">Todos</SelectItem>
          {dispositivos.map((dispositivo) => (
            <SelectItem key={dispositivo.nom_marca} value={dispositivo.nom_marca}>
              {dispositivo.nom_marca}
            </SelectItem>
          ))}
        </Select>

        <Select
          name="bodega"
          label="Filtrar por bodega"
          className="max-w-xs"
        >
          <SelectItem value="">Todos</SelectItem>
          {dispositivos.map((dispositivo) => (
            <SelectItem key={dispositivo.bodega} value={dispositivo.nom_bodega}>
              {dispositivo.nom_bodega}
            </SelectItem>
          ))}
        </Select>

        <Select
          name="modelo"
          label="Filtrar por Modelo"
          className="max-w-xs"
        >
          <SelectItem value="">Todos</SelectItem>
          {dispositivos.map((dispositivo) => (
            <SelectItem key={dispositivo.nom_modelo} value={dispositivo.nom_modelo}>
              {dispositivo.nom_modelo}
            </SelectItem>
          ))}
        </Select>

      </div>

      <div className="w-auto">
        <Table aria-label="Tabla de dispositivos">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>Nombre</TableColumn>
            <TableColumn>Marca</TableColumn>
            <TableColumn>Modelo</TableColumn>
            <TableColumn>Ubicación</TableColumn>
          </TableHeader>
          <TableBody>
            {dispositivosFiltrados.map((dispositivo) => (
              <TableRow key={dispositivo.id}>
                <TableCell>{dispositivo.id}</TableCell>
                <TableCell>{dispositivo.nom_dispositivo}</TableCell>
                <TableCell>{dispositivo.nom_marca}</TableCell>
                <TableCell>{dispositivo.nom_modelo}</TableCell>
                <TableCell>{dispositivo.nom_bodega}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
