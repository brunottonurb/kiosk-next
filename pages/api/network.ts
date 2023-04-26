import type { NextApiRequest, NextApiResponse } from 'next';
import { promisify } from 'util';
import { exec } from 'child_process';
const execAsync = promisify(exec);

const cmd = 'sudo nmap -o - -sn 192.168.178.0/24';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { stdout, stderr } = await execAsync(cmd);
  if (stderr) {
    console.error('Error running nmap: ' + stderr);
    res.status(500).json({ error: stderr });
  } else {
    try {
      // parse stdout
      const lines = stdout.split('\n');
      const devices = [];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('Nmap scan report for')) {
          const hostname = line.split(' ')[4].replace('.fritz.box', '');
          const ip = line.split(' ')[5].replace('(', '').replace(')', '');
          devices.push({ ip, hostname });

          // skip next line
          i++;
        }
      }

      res.status(200).json(devices);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
}
