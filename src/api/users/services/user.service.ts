import { dbPool } from '../../../dbPool.js';

export async function updateUser(user: any, id: number) {
  const fields = [];
  const values = [];
  for (const key in user) {
    if (key === 'id') {
      delete user[key];
      continue;
    }
    fields.push(`${key} = $${fields.length + 1}`);
    values.push(user[key]);
  }
  const query = fields.join(', ');
  console.log(query);
  const data = await dbPool.query(
    `UPDATE users SET ${query} WHERE id = $${values.length + 1} RETURNING *`,
    [...values, id]
  );
  if (data) {
    // return { status: 'success' };
    const data = await dbPool.query('SELECT * FROM users WHERE id = $1', [id]);
    return data.rows[0];
  }
}
export default { updateUser };
