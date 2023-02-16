import { useEffect, useState } from 'react';
import { Box, Container, Spinner, Text } from '@chakra-ui/react';
import Head from 'next/head';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Fanfic } from '../../types';
import FanficCard from '../../components/FanficCard';

const Explore = () => {
  const [fanfics, setFanfics] = useState<Fanfic[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const initFanfics = async () => {
      const fetchedJson = await fetchFanfics(0, 4);
      setFanfics(fetchedJson);
    };
    initFanfics();
  }, []);

  // fetches fanfics from api
  const fetchFanfics = async (tokenId: number, limit: number) => {
    const queryParams = {
      tokenId: tokenId.toString(),
      limit: limit.toString(),
    };
    const res = await fetch('/api/fanfics?' + new URLSearchParams(queryParams));
    const json = await res.json();

    if (!json.length) {
      setHasMore(false);
    }

    return json;
  };

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
          <InfiniteScroll
            dataLength={fanfics.length}
            next={async () => {
              const fetchedJson = await fetchFanfics(fanfics.length, 2);
              setFanfics((prev) => [...prev, ...fetchedJson]);
            }}
            hasMore={hasMore}
            loader={
              <Box textAlign={'center'} mt={5}>
                <Spinner color={'green.400'} />
              </Box>
            }
            endMessage={
              <Box style={{ textAlign: 'center' }}>
                <Text>Yay! All fanfics loaded 🎉</Text>
              </Box>
            }>
            {fanfics.map((fanfic) => (
              <Box key={fanfic.title + fanfic.kudos} py={5}>
                <FanficCard fanfic={fanfic} />
              </Box>
            ))}
          </InfiniteScroll>
        </Container>
      </>
    </>
  );
};

export default Explore;
