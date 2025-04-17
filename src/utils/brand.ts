import type { Brand } from "@/types/brands";

export const getBrand = async (name: string): Promise<Brand> => {
  const res = await fetch(`https://api.brandfetch.io/v2/search/${name}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = (await res.json()) as Brand[];

  return data[0];
};
