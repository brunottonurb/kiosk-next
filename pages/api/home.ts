import type { NextApiRequest, NextApiResponse } from 'next';
import { discoverGateway, TradfriClient } from "node-tradfri-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const discovered = await discoverGateway();
  const tradfri = new TradfriClient(discovered!.name);
  console.log(tradfri);
}
