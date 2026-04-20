import { Vegetable } from "./vegetable";

export type Planting = {
  id: string;
  status: string;
  planting_date: string;
  expected_harvest_date: string;
  vegetables: Vegetable | null;
};
