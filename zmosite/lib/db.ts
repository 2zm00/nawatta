import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 10,
});

export async function query<T>(sql: string, params: unknown[] = []): Promise<T> {
	try {
	  const [results] = await pool.execute(sql, params);
	  return results as T;
	} catch (error: any) {
	  console.error('Error executing query', error);
	  // 더 자세한 오류 정보 출력
	  if (error.sql) console.error('SQL:', error.sql);
	  if (error.sqlMessage) console.error('SQL Message:', error.sqlMessage);
	  throw error;
	}
  }