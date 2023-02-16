import type { NextApiRequest, NextApiResponse } from 'next';
import { spawn } from 'child_process';

import type { Fanfic } from '../../types';

// Runs python script
// potential cmd injection I think, prolly should check if it's in fandoms.json
const genFanfic = async (fandom: string, tags: string[]): Promise<string> => {
  return new Promise((resolve, reject) => {
    const pyprog = spawn('python3', [
      './utils/scraping/generate_fanfic.py',
      fandom,
      JSON.stringify(tags),
    ]);

    let data = '';
    let error = '';

    pyprog.stdout.on('data', (chunk) => {
      data += chunk;
    });

    pyprog.stderr.on('data', (chunk) => {
      error += chunk;
    });

    pyprog.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(error));
      } else {
        resolve(data);
      }
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Fanfic | Error>
) {
  if (req.method === 'POST') {
    try {
      const body = JSON.parse(req.body);
      const fandom = body.name;
      const tags = body.tags;

      console.log('creating fanfic', body);
      const fanfic = await genFanfic(fandom, tags);
      const fanficJson = await JSON.parse(fanfic);
      console.log('parsed json', fanficJson);

      res.status(200).json(fanficJson);
    } catch (error) {
      console.log(error);
      res.status(500).send(error as Error);
    }
  } else {
    res.status(405).setHeader('Allow', 'POST');
    return res.end(`Method ${req.method} Not Allowed`);
  }
}
