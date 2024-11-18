export interface ReservationDto {
  bookingDate: string;
  numOfGuests: number;
  user: string;
  restaurant: string;
  createdAt: string;
}

export interface ReservationJson {
  success: boolean;
  count: number;
  data: ReservationDto[];
}
