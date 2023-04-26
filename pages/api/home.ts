import type { NextApiRequest, NextApiResponse } from 'next';
import { discoverGateway, TradfriClient } from "node-tradfri-client";

let client: TradfriClient | null = null;


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // return not implemented
  res.status(501).json({ error: 'Not implemented' });
  return;

  if (!client) {
    const gateway = await discoverGateway();
    console.log(gateway);
    client = new TradfriClient(gateway!.addresses[0]);
    
    if (!(process.env.TRADFRI_IDENTITY && process.env.TRADFRI_PSK) && process.env.TRADFRI_SECURITY_CODE) {
      const { identity, psk } = await client.authenticate(process.env.TRADFRI_SECURITY_CODE!);
      console.log(identity, psk);
    } else if (process.env.TRADFRI_IDENTITY && process.env.TRADFRI_PSK) {
      await client.connect(process.env.TRADFRI_IDENTITY, process.env.TRADFRI_PSK);
    } else {
      throw new Error('Missing security code or identity/psk');
    }
  }

  console.log(client.devices);

  res.status(200).json({ name: 'John Doe' });
}

// process.stdin.resume(); //so the program will not close instantly ?

// function exitHandler(options, exitCode) {
//   if (client && options.cleanup) {
//     console.log('Destroying tradfri client...');
//     client.destroy();
//   }
//   if (exitCode || exitCode === 0) console.log(exitCode);
//   if (options.exit) process.exit();
// }

// //do something when app is closing
// process.on('exit', exitHandler.bind(null, { cleanup: true }));
// process.on('SIGINT', exitHandler.bind(null, { exit: true }));
// process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
// process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));
// process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
