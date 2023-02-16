import { useEffect, useState } from 'react';
import { Box, Container, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Fanfic } from '../../types';
import FanficCard from '../../components/FanficCard';

const FanficPage = () => {
  const [fanfic, setFanfic] = useState<Fanfic[]>();
  const router = useRouter();
  const { tokenId } = router.query;

  useEffect(() => {
    const fetchFanfics = async () => {
      const res = await fetch(`/api/fanfics?tokenId=${tokenId}`);
      const json = await res.json();
      setFanfic(json);
    };
    fetchFanfics();
  }, [tokenId]);

  return (
    <>
      <Head>
        <title>Explore | bearchainAI</title>
        <meta
          name="description"
          content="Explore other AI generated fanfictions"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Container maxW={'5xl'} py={3} pb={8}>
          {!fanfic || fanfic.length == 0 ? (
            <Box textAlign={'center'} m={5}>
              <Spinner color={'green.400'} />
            </Box>
          ) : (
            <Box py={5}>
              <FanficCard fanfic={fanfic[0]} />
            </Box>
          )}
        </Container>
      </>
    </>
  );
};

export default FanficPage;
