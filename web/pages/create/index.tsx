import { useState, KeyboardEventHandler } from 'react';
import Head from 'next/head';
import {
  Stack,
  Heading,
  Text,
  Button,
  Container,
  HStack,
  Box,
} from '@chakra-ui/react';
import AsyncSelect from 'react-select/async';
import CreateableSelect from 'react-select/creatable';

import type { Fandom, FandomRequest } from '../../types';
import { DoubleBlob } from '../../components/Blob';
import { useRouter } from 'next/router';

interface Option {
  value: string;
  label: string;
}

const Create = () => {
  const router = useRouter();
  const [value, setValue] = useState<Option | null>();
  const [loadingRandom, setLoadingRandom] = useState<boolean>(false);
  const [tagValue, setTagValue] = useState<readonly Option[]>([]);
  const [tagInputValue, setTagInputValue] = useState('');

  // Loads first 100 fandoms with matched input string
  const loadOptions = (fandomParams: FandomRequest) =>
    new Promise<Option[]>(async (resolve) => {
      const res = await fetch('/api/fandoms', {
        method: 'POST',
        body: JSON.stringify(fandomParams),
      });
      const out: Fandom[] = await res.json();
      const options: Option[] = out.map((val: Fandom) => ({
        value: val.name,
        label: val.name,
      }));
      resolve(options);
    });

  // Navigates to next page to generate fanfictions for given fandom
  const generateFanfic = (fandom: Option) => {
    router.push(
      {
        pathname: '/create/new',
        query: {
          fandom: JSON.stringify({ name: fandom.label }),
          tags: JSON.stringify(tagValue.map((tag) => tag.label)),
        },
      },
      '/create/new'
    );
  };

  // Handles react select input experience
  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!tagInputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setTagValue((prev) => [
          ...prev,
          { label: tagInputValue, value: tagInputValue },
        ]);
        setTagInputValue('');
        event.preventDefault();
    }
  };

  return (
    <>
      <Head>
        <title>Create | bearchainAI</title>
        <meta name="description" content="Create AI generated fanfictions" />
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
              <Text
                as={'span'}
                bgClip="text"
                bgGradient="linear-gradient(90deg, hsla(145, 83%, 74%, 1) 0%, hsla(204, 77%, 76%, 1) 100%)">
                bearchainAI
              </Text>
            </Heading>
            <Container
              textAlign={'start'}
              display="flex"
              flexDirection={'column'}
              justifyContent={'space-between'}
              gap="1rem">
              <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={(inputValue) =>
                  loadOptions({ search: inputValue, random: false })
                }
                placeholder="Start typing a fandom (e.g. Harry Potter, Star Wars) 🤔"
                isClearable
                value={value}
                onChange={(v) => setValue(v)}
                instanceId={'fandom-select'}
              />
              {value && (
                <Box px="5rem">
                  <CreateableSelect
                    components={{ DropdownIndicator: null }}
                    inputValue={tagInputValue}
                    isClearable
                    isMulti
                    menuIsOpen={false}
                    onChange={(newValue) => setTagValue(newValue)}
                    onInputChange={(newValue) => setTagInputValue(newValue)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter tags to improve generation 🏷️"
                    value={tagValue}
                  />
                </Box>
              )}
            </Container>
            <HStack>
              <Button
                colorScheme={'green'}
                onClick={() => {
                  if (value) {
                    generateFanfic(value);
                  }
                }}
                disabled={!value}>
                Forge 🔨
              </Button>
              <Button
                colorScheme={'green'}
                isLoading={loadingRandom}
                onClick={async () => {
                  setLoadingRandom(true);
                  const randomValue = await loadOptions({
                    search: '',
                    random: true,
                  });
                  setValue(randomValue[0]);
                  setLoadingRandom(false);
                }}>
                I&apos;m feeling lucky 🐈‍⬛
              </Button>
            </HStack>
          </Stack>

          <DoubleBlob />
        </Container>
      </>
    </>
  );
};

export default Create;
