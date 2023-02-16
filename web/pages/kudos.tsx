import { useState, useEffect } from 'react';
import {
  Container,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Spinner,
  Box,
} from '@chakra-ui/react';
import Head from 'next/head';

import { Kudo } from '../types';

const Kudos = () => {
  const [kudos, setKudos] = useState<Kudo[]>();

  useEffect(() => {
    const fetchKudos = async () => {
      const res = await fetch('/api/kudos');
      const out = await res.json();
      setKudos(out);
    };
    fetchKudos();
  }, []);

  return (
    <>
      <Head>
        <title>Kudos | bearchainAI</title>
        <meta
          name="description"
          content="Giving credit to fanfiction sources"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Container maxW={'5xl'} py={3} pb={8}>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th fontSize={'md'}>Author</Th>
                  <Th fontSize={'md'} isNumeric>
                    Kudos
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {kudos &&
                  kudos.map((kudo, i) => {
                    return (
                      <Tr key={i}>
                        {/* construct link to ao3 here */}
                        {/* could also link to opensea with filters */}
                        <Th fontWeight={'normal'}>{kudo.author}</Th>
                        <Th fontWeight={'normal'} isNumeric>
                          {kudo.cites}
                        </Th>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
            {!kudos && (
              <Box textAlign={'center'} m={5}>
                <Spinner color={'green.400'} />
              </Box>
            )}
          </TableContainer>
        </Container>
      </>
    </>
  );
};

export default Kudos;
