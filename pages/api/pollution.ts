import type { NextApiRequest, NextApiResponse } from 'next';

const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${process.env.LAT}&lon=${process.env.LON}&appid=${process.env.OWM_KEY}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const response = await fetch(url);
  const data = await response.json();
  res.status(200).json(data);
}
