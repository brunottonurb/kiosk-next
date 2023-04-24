import type { NextApiRequest, NextApiResponse } from 'next';

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${process.env.LAT}&lon=${process.env.LON}&appid=${process.env.OWM_KEY}&units=metric&exclude=minutely,daily,alerts`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const response = await fetch(url);
  const data = await response.json();
  res.status(200).json(data);
}
