

import { DeveloperDto } from "@/dtos/developer.dto";
import axios from "axios";

export interface DeveloperResponse {
  data: DeveloperDto[];
  nextPage: number | null;
}

export const fetchDevelopers = async ({ pageParam = 1 }): Promise<DeveloperResponse> => {
  const response = await axios.get(`/api/developers?page=${pageParam}`);
  return response.data;
};


export async function fetchDeveloperById(id: string): Promise<DeveloperDto> {
  const res = await fetch(`http://localhost:3000/api/developers/${id}`);

  if (!res.ok) {
    throw new Error('Developer not found');
  }

  return res.json();
}
