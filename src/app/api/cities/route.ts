// src/app/api/cities/route.ts

import { NextResponse } from "next/server";
import { cities } from "../../../data/worldcities/cities"; // Adjust path as needed

export const GET = () => {
  return NextResponse.json(cities);
};