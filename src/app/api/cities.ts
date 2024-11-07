// src/pages/api/cities.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { cities } from "../../data/cities"; // Adjust path if necessary

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(cities);
}
