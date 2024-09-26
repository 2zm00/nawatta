// import type { NextApiRequest, NextApiResponse } from 'next';
// import { query } from '../lib/db';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       const result = await query('SELECT * FROM users');
//       res.status(200).json(result.rows);
//     } catch (error) {
//       res.status(500).json({ error: 'Error fetching users' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }