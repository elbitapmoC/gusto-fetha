// src/app/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import Table from "../components/table/Table";
import PaginationControls from "../components/table/PaginationControls";
import TableItemsPerPage from "../components/table/TableItemsPerPage";
import Search from "../components/ui/Search";
import Title from "@/components/ui/Title";

export default function HomePage() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch cities data
  useEffect(() => {
    setLoading(true);
    fetch("/api/cities")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch cities.");
        return res.json();
      })
      .then((data) => {
        setCities(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Handle search term updates
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Filter cities based on search term
  const filteredCities = useMemo(() => {
    return cities.filter((city: { name: string }) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cities, searchTerm]);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredCities.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Slice data for the current page
  const paginatedCities = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return filteredCities.slice(startIdx, endIdx);
  }, [filteredCities, currentPage, itemsPerPage]);

  return (
    <main>
      <Title title="City Directory" />

      <div className="mb-4">
        <Search onSearch={handleSearch} />
      </div>

      {loading ? (
        <p className="text-center">Loading cities...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          <Table data={paginatedCities} />
          <div className="flex justify-between items-center mt-6">
            <TableItemsPerPage
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
            />
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={loading}
            />
          </div>
        </>
      )}
    </main>
  );
}
