import { dbPool } from '../../../dbPool';
import type { UserResponse } from '../../../types/User';

export async function updateUser(user: UserResponse) {
  const { id, name, email, phone, role } = user;
  const data = await dbPool.query(
    'UPDATE users SET name = $1, email = $2, phone = $3, role = $4 WHERE id = $5',
    [name, email, phone, role, id]
  );
}
