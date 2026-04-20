import { Planting } from "./planting";
import { Crop } from "./crop";
export type Order = {
  order_id: string;
  price: number;
  order_amount: number;
  status: string;
  createdAt: string;
  harvert_date: string; 
  plantings: Planting[];
    plantAmount :number;
    crops : Crop[];
   slip_url?: string;
   payment_group_id?:string
   comment : string;
   rating : number;
};
