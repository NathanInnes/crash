import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  randomNumber: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ randomNumber: Math.round(Math.random() * 100) / 100})
}
