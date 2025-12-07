export interface booking {
  id: number;
  user_id: number;
  vehicle_id: number;
  start_date: Date;
  end_date: Date;
  total_price: number;
  status: string;
}
