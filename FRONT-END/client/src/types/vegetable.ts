export type Vegetable = {
   name: string;
  nameEn: string;
  plants_per_plot: number;
  type: {
    type: string,
    enum: ["leaf", "fruit"],   // leaf = ผักกินใบ, fruit = ผักกินผล
    required: true,
  },

};