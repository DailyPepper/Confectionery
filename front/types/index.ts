export interface TableItem {
  article: string;
  name: string;
  quantity: number | null;
  unit: string | null;
  purchasePrice: number | null;
  supplier: string | null;
  deliveryDate: string | null;
  businessPrice: number | null;
  expiryDate: string | null;
}

export interface User {
  id: string;
  username: string;
  role: string;
  fullName: string;
}

export interface ToolTypes {
  id: number;
  name: string;
}

export interface Supplier {
  id: number;
  name: string;
  address: string;
  deliveryTime: number;
}

export interface Tool {
  id: number;
  name: string;
  description: string;
  supplier: Supplier;
  wear: string;
  type: ToolTypes;
  purchaseDate: string;
  quantity: number;
}

export interface Toppings {
  id: number;
  article: string;
  typeId: number;
  name: string;
  quantity: number | null;
  unit: number | null;
  purchasePrice: number | null;
  supplierId: number;
  deliveryDuration: number | null;
  shelfLife: number | null;
}

export interface ToppingsTypes {
  id: number;
  name: string;
}
