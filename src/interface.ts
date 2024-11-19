// TODO: restaurant is not string but a restuant object without image url
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
