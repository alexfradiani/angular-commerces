// Data type for the Commerce model
export interface Commerce {
  id: number;
  uid: string;
  color: string;
  department: string;
  material: string;
  product_name: string;
  price: number;
  price_string: string;
  promo_code: string;
}

// Response type from the commerce service
export interface CommercesResponse {
  commerces: Commerce[];
}

// Parameters type for commerce service requests
export interface CommercesParams {
  sortDirection: 'asc' | 'desc' | '';
  sortField: string;
  pageIndex: number;
  pageSize: number;
}
