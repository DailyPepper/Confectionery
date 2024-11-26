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
  article: string;
  name: string;
  quantity: number;
  unit: number;
  purchasePrice: number;
  typeId: number;
  supplierId: number;
  deliveryDuration: number;
  shelfLife: number;
}

export interface ToppingsTypes {
  id: number;
  name: string;
}
