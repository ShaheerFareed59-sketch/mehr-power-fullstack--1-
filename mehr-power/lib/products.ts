export type Category = {
  slug: "solar-panels" | "lithium-batteries" | "generators";
  name: string;
  tagline: string;
  description: string;
  accent: string;
};

export type Product = {
  id: string;
  category: Category["slug"];
  name: string;
  summary: string;
  specs: { label: string; value: string }[];
};

export const categories: Category[] = [
  {
    slug: "solar-panels",
    name: "Solar Panels",
    tagline: "Monocrystalline arrays",
    description:
      "Rooftop arrays sized for Karachi's sun exposure, holding output even on hazy or dusty days.",
    accent: "#E7A23D"
  },
  {
    slug: "lithium-batteries",
    name: "Lithium Batteries",
    tagline: "LiFePO4 battery banks",
    description:
      "Stores solar surplus and off-peak grid power for the hours you actually lose electricity.",
    accent: "#45D9A4"
  },
  {
    slug: "generators",
    name: "Generators",
    tagline: "Hybrid backup generators",
    description:
      "Steps in only when the battery bank runs low, sized to your real load instead of guesswork.",
    accent: "#C9C2A8"
  }
];

export const products: Product[] = [
  {
    id: "sp-350",
    category: "solar-panels",
    name: "MEHR SunLine 350",
    summary: "Entry rooftop panel for small homes and single-circuit backup.",
    specs: [
      { label: "Output", value: "350W" },
      { label: "Efficiency", value: "20.1%" },
      { label: "Warranty", value: "25 years" }
    ]
  },
  {
    id: "sp-450",
    category: "solar-panels",
    name: "MEHR SunLine 450",
    summary: "Balanced panel for mid-size homes running fans, fridge and lights.",
    specs: [
      { label: "Output", value: "450W" },
      { label: "Efficiency", value: "20.9%" },
      { label: "Warranty", value: "25 years" }
    ]
  },
  {
    id: "sp-550",
    category: "solar-panels",
    name: "MEHR SunLine 550",
    summary: "High-density panel for commercial roofs with limited space.",
    specs: [
      { label: "Output", value: "550W" },
      { label: "Efficiency", value: "21.5%" },
      { label: "Warranty", value: "25 years" }
    ]
  },
  {
    id: "lb-5",
    category: "lithium-batteries",
    name: "MEHR CellBank 5",
    summary: "Compact bank for a few hours of essential-circuit backup.",
    specs: [
      { label: "Capacity", value: "5 kWh" },
      { label: "Cycle life", value: "6,000+" },
      { label: "BMS", value: "Built-in smart BMS" }
    ]
  },
  {
    id: "lb-10",
    category: "lithium-batteries",
    name: "MEHR CellBank 10",
    summary: "Whole-home coverage through a typical multi-hour outage.",
    specs: [
      { label: "Capacity", value: "10 kWh" },
      { label: "Cycle life", value: "6,000+" },
      { label: "BMS", value: "Built-in smart BMS" }
    ]
  },
  {
    id: "lb-20",
    category: "lithium-batteries",
    name: "MEHR CellBank 20",
    summary: "Commercial-grade storage for extended, overnight outages.",
    specs: [
      { label: "Capacity", value: "20 kWh" },
      { label: "Cycle life", value: "6,000+" },
      { label: "BMS", value: "Built-in smart BMS" }
    ]
  },
  {
    id: "gn-5",
    category: "generators",
    name: "MEHR Hybrid G5",
    summary: "Small backstop generator for homes with a modest battery bank.",
    specs: [
      { label: "Output", value: "5 kVA" },
      { label: "Start", value: "Auto-start on low charge" },
      { label: "Fuel", value: "Petrol / gas" }
    ]
  },
  {
    id: "gn-10",
    category: "generators",
    name: "MEHR Hybrid G10",
    summary: "Mid-size generator for homes or small offices with mixed loads.",
    specs: [
      { label: "Output", value: "10 kVA" },
      { label: "Start", value: "Auto-start on low charge" },
      { label: "Fuel", value: "Petrol / gas" }
    ]
  },
  {
    id: "gn-20",
    category: "generators",
    name: "MEHR Hybrid G20",
    summary: "Commercial generator sized for extended outages and heavy load.",
    specs: [
      { label: "Output", value: "20 kVA" },
      { label: "Start", value: "Auto-start on low charge" },
      { label: "Fuel", value: "Petrol / gas" }
    ]
  }
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProducts(categorySlug?: string) {
  if (!categorySlug || categorySlug === "all") return products;
  return products.filter((p) => p.category === categorySlug);
}

/**
 * Points the browser at the Python (FastAPI) backend when configured,
 * otherwise falls back to the built-in Next.js route handler at /api/quote.
 * Set NEXT_PUBLIC_API_URL=http://localhost:8000 in .env.local to use the
 * FastAPI service in backend/.
 */
export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function submitQuote(payload: {
  name: string;
  email: string;
  phone: string;
  city: string;
  category: string;
  message: string;
}) {
  const endpoint = API_BASE ? `${API_BASE}/api/quote` : "/api/quote";
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Something went wrong." }));
    throw new Error(err.detail ?? "Something went wrong.");
  }
  return res.json();
}
