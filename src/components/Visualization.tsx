"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import CityRepo from "@/infrastructure/CityRepo";
import { City } from "@/types";

const repo = new CityRepo();

function Visualization() {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCities() {
      try {
        const data = await repo.getCities(5); // Fetch 5 cities as an example
        setCities(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      }
    }

    fetchCities();
  }, []);

  useEffect(() => {
    if (!chartRef.current || cities.length === 0) return;

    const containerWidth = chartRef.current.offsetWidth || 400;
    const WIDTH = containerWidth;
    const HEIGHT = 300;
    const MARGIN = { top: 20, right: 20, bottom: 30, left: 40 };

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", WIDTH)
      .attr("height", HEIGHT);

    const x = d3
      .scaleBand()
      .range([MARGIN.left, WIDTH - MARGIN.right])
      .padding(0.1)
      .domain(cities.map((city) => city.name));

    const y = d3
      .scaleLinear()
      .range([HEIGHT - MARGIN.bottom, MARGIN.top])
      .domain([0, d3.max(cities, (city) => city.population) || 0]);

    svg
      .append("g")
      .attr("transform", `translate(0,${HEIGHT - MARGIN.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("class", "text-sm text-gray-700");

    svg
      .append("g")
      .attr("transform", `translate(${MARGIN.left},0)`)
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("class", "text-sm text-gray-700");

    const tooltip = d3
      .select("body")
      .append("div")
      .attr(
        "class",
        "absolute bg-black text-white text-xs rounded px-2 py-1 opacity-0 pointer-events-none transition-opacity"
      );

    svg
      .selectAll(".bar")
      .data(cities)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (city: City) => x(city.name) || 0)
      .attr("y", (city: City) => y(city.population))
      .attr("height", (city: City) => y(0) - y(city.population))
      .attr("width", x.bandwidth())
      .attr("fill", "rgb(37, 99, 235)")
      .on("mouseover", function (event, city: City) {
        tooltip
          .style("opacity", "1")
          .html(
            `<strong>${
              city.country
            }</strong>: ${city.population.toLocaleString()}`
          )
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY + 5}px`);
        d3.select(this).attr("fill", "rgb(59, 130, 246)");
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY + 5}px`);
      })
      .on("mouseout", function () {
        tooltip.style("opacity", "0");
        d3.select(this).attr("fill", "rgb(37, 99, 235)");
      });

    return () => {
      tooltip.remove();
      d3.select(chartRef.current).select("svg").remove();
    };
  }, [cities]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div
      ref={chartRef}
      className="w-full mx-auto"
      role="img"
      aria-label="Bar chart showing city populations"
    />
  );
}

export default Visualization;
