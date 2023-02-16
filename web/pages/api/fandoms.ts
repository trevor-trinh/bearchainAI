import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

import type { FandomJSONData, Fandom, FandomRequest } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Fandom[]>
) {
  // Read the json data from fandoms.json
  const jsonDirectory = path.join(process.cwd(), 'json');
  const fileContents = await fs.readFile(
    jsonDirectory + '/fandoms.json',
    'utf8'
  );

  const fandoms: FandomJSONData = await JSON.parse(fileContents);

  if (req.method === 'POST') {
    // Parses searched input string and random boolean
    const { search, random } = JSON.parse(req.body) as FandomRequest;
    let output: Fandom[];

    // If random, returns single random top fandom
    // else if search is only empty space, set output to top fandoms
    // else filters fandom for searched value and returns first 100
    if (random) {
      output = [fandoms.top[Math.floor(Math.random() * fandoms.top.length)]];
    } else if (!search.replace(/\s/g, '').length) {
      output = fandoms.top;
    } else {
      output = fandoms.all
        .filter((i: Fandom) =>
          i.name.toLocaleLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 100);
    }

    res.status(200).json(output);
  } else {
    res.status(405).setHeader('Allow', 'POST');
    return res.end(`Method ${req.method} Not Allowed`);
  }
}
