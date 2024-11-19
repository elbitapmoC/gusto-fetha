"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { City } from "@/types";

interface VisualizationProps {
  cities: City[]; // The paginated and filtered cities
}

function Visualization({ cities }: VisualizationProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current || cities.length === 0) return;

    const containerWidth = chartRef.current.offsetWidth || 400;
    const HEIGHT = 300;

    // Dynamically calculate left margin based on y-axis label width
    const maxPopulation = d3.max(cities, (city) => city.population) || 0;
    const maxLabelWidth = maxPopulation.toLocaleString().length * 8; // Estimate label width
    const MARGIN = {
      top: 20,
      right: 20,
      bottom: 50,
      left: Math.max(50, maxLabelWidth),
    };

    const WIDTH = containerWidth;

    // Clear the existing SVG to redraw
    d3.select(chartRef.current).select("svg").remove();

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("viewBox", `0 0 ${WIDTH} ${HEIGHT}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .classed("responsive-svg", true);

    const x = d3
      .scaleBand()
      .range([MARGIN.left, WIDTH - MARGIN.right])
      .padding(0.1)
      .domain(cities.map((city) => city.name));

    const y = d3
      .scaleLinear()
      .range([HEIGHT - MARGIN.bottom, MARGIN.top])
      .domain([0, maxPopulation]);

    // X-Axis
    svg
      .append("g")
      .attr("transform", `translate(0,${HEIGHT - MARGIN.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("class", "text-sm text-gray-700")
      .style("font-size", "12px")
      .style("text-anchor", "end")
      .attr("dy", "0.35em")
      .attr("dx", "-0.5em")
      .attr("transform", "rotate(-45)") // Rotate labels
      .text((d) =>
        String(d).length > 10 ? `${String(d).substring(0, 10)}...` : String(d)
      ) // Explicitly cast d to string
      .append("title") // Tooltip for full text
      .text((d) => String(d)); // Cast d to string

    // Y-Axis
    svg
      .append("g")
      .attr("transform", `translate(${MARGIN.left},0)`)
      .call(d3.axisLeft(y).tickFormat(d3.format(",.0f"))) // Format y-axis labels
      .selectAll("text")
      .attr("class", "text-sm text-gray-700")
      .style("font-size", "12px");

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
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("class", "bar")
            .attr("x", (city) => x(city.name) || 0)
            .attr("y", y(0)) // Start from the bottom
            .attr("height", 0) // Start with no height
            .attr("width", x.bandwidth())
            .attr("fill", "rgb(37, 99, 235)")
            .call((enter) =>
              enter
                .transition()
                .duration(750) // Animate over 750ms
                .attr("y", (city) => y(city.population))
                .attr("height", (city) => y(0) - y(city.population))
            ),
        (update) =>
          update
            .transition()
            .duration(750) // Smoothly update existing bars
            .attr("x", (city) => x(city.name) || 0)
            .attr("y", (city) => y(city.population))
            .attr("height", (city) => y(0) - y(city.population)),
        (exit) =>
          exit
            .transition()
            .duration(500) // Animate removal of bars
            .attr("y", y(0)) // Shrink to the bottom
            .attr("height", 0)
            .remove()
      )
      .on("mouseover", function (event, city) {
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
  }, [cities]); // Re-render chart when cities data changes

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
