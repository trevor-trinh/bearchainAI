import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container, Heading, Text, Stack, Button } from '@chakra-ui/react';
import { ethers } from 'ethers';

import { contractAddress, contractAbi } from '../../utils/config';
import { Fandom, Fanfic } from '../../types';
import FanficCard from '../../components/FanficCard';

const NewFanfic = () => {
  const router = useRouter();
  const [fandom, setFandom] = useState<Fandom>();
  const [fanfic, setFanfic] = useState<Fanfic>();
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Loads fandom from previous page
  useEffect(() => {
    try {
      let fandom: Fandom;
      let tags: string[];

      if (!router.query.fandom) {
        router.replace('/create');
        console.log('Error: no fandom provided, redirecting to /create.');
      } else {
        fandom = JSON.parse(router.query.fandom.toString());
        setFandom(fandom);
      }

      if (!router.query.tags) {
        console.log('Error: no tags provided, continuing without tags.');
      } else {
        tags = JSON.parse(router.query.tags.toString());
        setTags(tags);
      }
    } catch (error) {
      console.log('Error parsing query parameters: ', error);
      router.replace('/create');
      console.log('Redirecting to /create.');
    }
  }, [router, router.query]);

  // Generates fanfic
  useEffect(() => {
    const generateFanfic = async () => {
      const req = { ...fandom, tags: tags };

      console.log(req);
      const res = await fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify(req),
      });
      const out: Fanfic = await res.json();

      setFanfic(out);
      setLoading(false);
    };

    if (fandom) {
      generateFanfic();
    }
  }, [fandom, tags]);

  // Records fanfic by minting NFT
  const mintsFanficNFT = async () => {
    setLoading(true);
    try {
      const { ethereum } = window as any;

      if (!ethereum) {
        throw new Error('Please install MetaMask');
      }

      // Ethers setup
      const provider = __________;
      await provider.send('eth_requestAccounts', []);
      const signer = __________;

      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      // formatting for minting to smart contract
      const fanficTxn = await contract._____(
        JSON.stringify(fanfic!.title).slice(1, -1),
        JSON.stringify(fanfic!.content).slice(1, -1),
        JSON.stringify(fanfic!.fandom.name).slice(1, -1),
        fanfic!.kudos.map((kudo) => [
          JSON.stringify(kudo.author).slice(1, -1),
          kudo.cites,
        ])
      );

      console.log(fanficTxn);
      await fanficTxn.wait();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Create | FanficForge</title>
        <meta name="description" content="Create AI generated fanfictions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 4, md: 6 }}
          py={'7%'}>
          <Heading
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            fontWeight={{ base: 'bold', md: 'extrabold' }}
            lineHeight={'110%'}>
            <Text
              as={'span'}
              bgClip="text"
              bgGradient="linear-gradient(90deg, hsla(145, 83%, 74%, 1) 0%, hsla(204, 77%, 76%, 1) 100%)">
              Fanfiction {!fanfic ? 'forging...' : 'forged!'}
            </Text>
          </Heading>
          {!fanfic ? (
            <>
              <video autoPlay muted loop style={{ overflow: 'hidden' }}>
                <source src="/blockchain.mp4" type="video/mp4" />
              </video>
              <Text>
                (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
                <br />
                doing stuff
              </Text>
            </>
          ) : (
            <>
              <FanficCard fanfic={fanfic} />
              <Button
                alignSelf={'center'}
                onClick={mintsFanficNFT}
                colorScheme={'green'}
                isLoading={loading}>
                mint
              </Button>
            </>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default NewFanfic;
