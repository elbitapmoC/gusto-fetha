"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import CityRepo from "@/infrastructure/CityRepo";
import TableItemsPerPage from "@/components/table/TableItemsPerPage";
import PaginationControls from "@/components/table/PaginationControls";
import Search from "@/components/ui/Search";
import { City } from "@/types";

function Visualization() {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const [cities, setCities] = useState<City[]>([]); // All city data
  const [filteredCities, setFilteredCities] = useState<City[]>([]); // Filtered cities
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [itemsPerPage, setItemsPerPage] = useState(10); // Items per page
  const [currentPage, setCurrentPage] = useState(1); // Current page

  const WIDTH = 600;
  const HEIGHT = 400;
  const MARGIN = { top: 40, right: 30, bottom: 50, left: 70 };

  useEffect(() => {
    // Fetch all city data
    const cityRepo = new CityRepo();
    cityRepo
      .getCities()
      .then((data) => {
        setCities(data);
        setFilteredCities(data); // Initialize filtered cities
      })
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  useEffect(() => {
    // Filter cities based on search term
    const filtered = cities.filter(
      (city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCities(filtered);
    setCurrentPage(1); // Reset to first page on new search
  }, [searchTerm, cities]);

  const totalPages = Math.ceil(filteredCities.length / itemsPerPage);
  const paginatedCities = filteredCities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (!chartRef.current || paginatedCities.length === 0) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    const x = d3
      .scaleBand()
      .range([MARGIN.left, WIDTH - MARGIN.right])
      .padding(0.2)
      .domain(paginatedCities.map((city) => city.name));

    const y = d3
      .scaleLinear()
      .range([HEIGHT - MARGIN.bottom, MARGIN.top])
      .domain([0, d3.max(paginatedCities, (city) => city.population) || 0]);

    // Add axes
    svg
      .append("g")
      .attr("transform", `translate(0,${HEIGHT - MARGIN.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("font-size", "12px")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end");

    svg
      .append("g")
      .attr("transform", `translate(${MARGIN.left},0)`)
      .call(d3.axisLeft(y).ticks(5));

    // Add bars
    svg
      .selectAll(".bar")
      .data(paginatedCities)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (city) => x(city.name) || 0)
      .attr("y", (city) => y(city.population))
      .attr("height", (city) => y(0) - y(city.population))
      .attr("width", x.bandwidth())
      .attr("fill", "steelblue");
  }, [paginatedCities]);

  return (
    <div className="w-full max-w-xl mx-auto sm:py-8 text-center">
      <svg ref={chartRef} width={WIDTH} height={HEIGHT}></svg>
    </div>
  );
}

export default Visualization;
