import Link from "next/link";
import {
  Box,
  Container,
  Text,
  Stack,
  Flex,
  Heading,
  HStack,
  Spacer,
} from "@chakra-ui/react";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <Box minH="100vh" display="flex" flexDirection="column">
    <Box bg="gray.100">
      <Container maxW={"6xl"} py={4}>
        <Flex>
          <Heading size="md">
            <Link href="/">
              <Text
                as={"span"}
                bgClip="text"
                bgGradient="linear-gradient(90deg, hsla(145, 83%, 74%, 1) 0%, hsla(204, 77%, 76%, 1) 100%)"
              >
                logo
              </Text>
            </Link>
          </Heading>
          <Spacer />
          <HStack gap="4rem">
            <Link href="/">About</Link>
            <Link href="/kudos">Kudos</Link>
            <Link href="/explore">Explore</Link>
            <Link href="/create">Create</Link>
          </HStack>
        </Flex>
      </Container>
    </Box>

    <Container maxW={"6xl"}>{children}</Container>

    <Spacer />

    <Box bg="gray.100">
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>Made with 🥑 by Trevor & Anna.</Text>
      </Container>
    </Box>
  </Box>
);

export default Layout;
