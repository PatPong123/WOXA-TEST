export type User = {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  address?: string;
  city?: string;
  postalCode?: string;
  phone?: string;
  role: "user" | "admin";
  paymentMethod?: string;
   paymentDetails?: string;
   points:number
};
