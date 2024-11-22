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
