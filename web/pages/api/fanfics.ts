import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';

import { contractAddress, contractAbi } from '../../utils/config';
import { Fanfic, Kudo } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Fanfic[]>
) {
  if (req.method === 'GET' && req.query.tokenId) {
    const tokenId = parseInt(req.query.tokenId.toString());
    const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 1;

    const provider = new ethers.providers.JsonRpcProvider(__________);
    const contract = new ethers.Contract(__________, __________, __________);

    const totalMinted = await contract.__________;
    let fanfics: Fanfic[] = [];

    // scuffed but wtv
    // data finaggle to get into correct format
    for (let i = tokenId; i < tokenId + limit; i++) {
      if (i >= totalMinted) {
        break;
      }

      // Get contract information
      const fullURI = await contract.__________;
      const basicInfo = await contract.__________;

      const uriJson = JSON.parse(
        Buffer.from(fullURI.substring(29), 'base64').toString()
      );

      const kudos: Kudo[] = [...uriJson.attributes]
        .slice(0, -1)
        .map((author: { trait_type: string; value: number }) => ({
          author: author.trait_type,
          cites: author.value,
        }));

      const fanfic: Fanfic = {
        title: basicInfo.title,
        content: basicInfo.content,
        fandom: basicInfo.fandom,
        kudos: kudos,
      };
      fanfics.push(fanfic);
    }

    res.status(200).json(fanfics);
  } else {
    res.status(405).setHeader('Allow', 'GET');
    return res.end(`Method ${req.method} Not Allowed`);
  }
}
