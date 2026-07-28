import api from "@/lib/api/axios";


export interface Material {
  id: string;
  name: string;
  category: string;
  subcategory: string;

  symbol?: string | null;

  density: number;
  youngsModulus: number;
  yieldStrength: number;
  ultimateStrength: number;

  thermalConductivity: number;
  electricalConductivity: number;
  thermalExpansion: number;
  specificHeat: number;

  meltingPoint: number;
  maxOperatingTemp: number;

  resistivity: number;

  dielectricStrength?: number | null;
  hardness?: number | null;

  color: string;

  isStretchable: boolean;
  isConductive: boolean;
  isInsulating: boolean;
  isMagnetic: boolean;
  isTransparent: boolean;
  isBiodegradable: boolean;

  imageUrl?: string | null;

  description: string;

  applications: string[];

  createdAt: string;
  updatedAt: string;
}


export async function getMaterials(): Promise<Material[]> {
  const response = await api.get("/materials");

  return response.data;
}


export async function searchMaterials(
  query: string,
): Promise<Material[]> {
  const response = await api.get("/materials", {
    params: {
      search: query,
    },
  });

  return response.data;
}


export async function getMaterialCategories() {
  const response = await api.get("/materials/categories");

  return response.data;
}


export async function getMaterialById(
  id: string,
): Promise<Material> {
  const response = await api.get(`/materials/${id}`);

  return response.data;
}