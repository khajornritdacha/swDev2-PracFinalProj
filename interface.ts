export interface RestaurantItem {
    _id: string,
    name: string,
    address: string,
    foodtype: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
  }
  
  export interface Pagination {
    page: number;
    totalPages: number;
    limit: number;
  }
  
  export interface RestaurantJson {
    success: boolean;
    count: number;
    pagination: Pagination;
    data: RestaurantItem[];
  }
export interface SearchBarWithFiltersProps {
    onSearch: (newFilters: any) => void;
    searchQuery?: string;
    cuisine?: string;
    province?: string;
    sortOption?: string;
    page?: number;
    limit?: number;
  }
  