import type { NextApiRequest, NextApiResponse } from 'next';

const url = `https://v5.bvg.transport.rest/stops/${process.env.BVG_STOP_ID}/departures?remarks=true&when=now&results=20`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const response = await fetch(url);
  const data = await response.json();
  res.status(200).json(data);
}
