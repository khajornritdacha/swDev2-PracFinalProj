export interface DeleteResponse {
  success: boolean;
}

export interface StatusResponse {
  success: boolean;
}

export interface GetRestaurantDto {
  _id: string;
  address: string;
  name: string;
  tel: string;
}

export interface GetReservationDto {
  _id: string;
  bookingDate: string;
  numOfGuests: number;
  user: string;
  restaurant: GetRestaurantDto;
  createdAt: string;
}

export interface RestaurantDto {
  _id: string;
  address: string;
  name: string;
  tel: string;
  postalcode: string;
  province: string;
  foodtype: string;
  picture: string;
}

export interface GetReservationJson {
  success: boolean;
  count: number;
  data: GetReservationDto[];
}

export interface CreateReservationDto {
  bookingDate: string;
  numOfGuests: number;
  createdAt: string;
}
