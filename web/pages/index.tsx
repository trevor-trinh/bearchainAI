import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, Text, Heading, Container, Stack } from '@chakra-ui/react';

import { DoubleBlob } from '../components/Blob';

const Home = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>bearchainAI</title>
        <meta name="description" content="Welcome to bearchainAI!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Container maxW={'5xl'}>
          <Stack
            textAlign={'center'}
            align={'center'}
            spacing={{ base: 6, md: 8 }}
            py={'30%'}>
            <Heading
              fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
              fontWeight={{ base: 'bold', md: 'extrabold' }}
              lineHeight={'110%'}>
              Welcome to the{' '}
              <Text
                as={'span'}
                bgClip="text"
                bgGradient="linear-gradient(90deg, hsla(145, 83%, 74%, 1) 0%, hsla(204, 77%, 76%, 1) 100%)">
                bearchainAI
              </Text>
              !
            </Heading>{' '}
            <Text
              color={'gray.500'}
              maxW={'3xl'}
              fontSize={{ base: 'lg', md: 'xl' }}>
              Some little blurb
            </Text>
            <Button
              colorScheme={'green'}
              onClick={() => router.push('/create')}>
              get started
            </Button>
          </Stack>

          <DoubleBlob />
        </Container>
      </>
    </>
  );
};

export default Home;
