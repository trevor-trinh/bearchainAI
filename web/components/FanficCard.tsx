import { Card, CardBody, CardFooter, Heading, Text } from '@chakra-ui/react';

import type { Fanfic } from '../types';

const FanficCard = ({ fanfic }: { fanfic: Fanfic }) => {
  return (
    <>
      <Card
        textAlign={'start'}
        w="xl"
        m="auto"
        minH="25vh"
        shadow={'lg'}
        _hover={{
          backgroundColor: 'green.50',
          transform: 'scale(1.05)',
          transition: 'transform 250ms, background-color 250ms',
        }}
        transition={'transform 250ms, background-color 250ms'}>
        <CardBody>
          <Heading size={'md'}>{fanfic.title}</Heading>
          <Text>{fanfic.content}</Text>
        </CardBody>
        <CardFooter>
          {fanfic.kudos.map((kudo) => (
            <p key={kudo.author}>{kudo.author}</p>
          ))}
        </CardFooter>
      </Card>
    </>
  );
};

export default FanficCard;
