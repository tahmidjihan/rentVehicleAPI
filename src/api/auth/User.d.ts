export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'customer';
}
export interface UserResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'customer';
}

export interface Credentials {
  email: string;
  password: string;
}
