// src/app/api/cities/route.ts

import { NextResponse } from "next/server";
import { cities } from "../../../data/cities"; // Adjust this path if necessary

export async function GET() {
  return NextResponse.json(cities);
}
