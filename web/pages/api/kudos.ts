import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';

import { contractAddress, contractAbi } from '../../utils/config';
import { Kudo } from '../../types';

// update this to be a websocket and load stuff as you go?
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Kudo[]>
) {
  if (req.method === 'GET') {
    const provider = new ethers.providers.JsonRpcProvider(__________);
    const contract = new ethers.Contract(__________, __________, __________);

    let allKudos: Kudo[] = [];
    const totalAuthors = await contract.__________;

    // Loads all authors and their total citations
    for (let i = 0; i < totalAuthors; i++) {
      const author = await contract.__________;
      const authorKudos = await contract.__________;
      console.log(author, authorKudos.toNumber());
      allKudos.push({
        author: author,
        cites: authorKudos.toNumber(),
      });
    }

    res.status(200).json(allKudos);
  } else {
    res.status(405).setHeader('Allow', 'GET');
    return res.end(`Method ${req.method} Not Allowed`);
  }
}
