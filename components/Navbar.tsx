import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  useColorModeValue,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link as ChakraLink } from "@chakra-ui/react";

const Links = ["User guide", "About us", "My brain"];
{
  /* <ChakraLink as={ReactRouterLink} to="/home"> */
}
{
  /*   Home */
}
{
  /* </ChakraLink>; */
}

const NavLink = ({ name }) => {
  return (
    <ChakraLink
      to={`/${String(name).toLowerCase()}`}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("green.100", "green.700"),
      }}
    >
      {name ? name : "Home"}
    </ChakraLink>
  );
};

export const Navbar = () => {
  return (
    <>
      <Box bg="#eeeeee" px={4} height="7vh">
        <Flex h={10} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box>{/* RISE */}</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Box>
                <Image src="/logo.svg" alt="logo" width={70} />
              </Box>
              {Links.map((link) => (
                <NavLink key={link} name={link} />
              ))}
            </HStack>
          </HStack>

          <HStack>
            <Input
              color="#7E7A79"
              border="1px solid #7E7A79"
              borderRadius="20"
              boxShadow="md"
              px={10}
            />
          </HStack>

          <Flex alignItems={"center"}>
            <Box
              as="button"
              bg="#e79749"
              color="white"
              cursor="pointer"
              borderRadius="20"
              boxShadow="md"
              mx={2}
              px={5}
              py={1}
            >
              Share
            </Box>
            <Box
              as="button"
              color="#7E7A79"
              border="2px solid #7E7A79"
              cursor="pointer"
              borderRadius="20"
              mx={2}
              px={5}
              py={1}
            >
              100%
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

const DesktopSubNav = ({ label, href, to, subLabel }) => {
  return (
    <>
      {href ? (
        <Box
          role={"group"}
          display={"block"}
          p={2}
          rounded={"md"}
          _hover={{ bg: useColorModeValue("green.50", "gray.900") }}
        >
          <ChakraLink color={"black"} as="a" href={href} _hover={{}} isExternal>
            <Stack direction={"row"} align={"center"}>
              <Box>
                <Text
                  transition={"all .3s ease"}
                  _groupHover={{ color: "green.400" }}
                  fontWeight={500}
                >
                  {label}
                </Text>
                <Text fontSize={"sm"}>{subLabel}</Text>
              </Box>
              <Flex
                transition={"all .3s ease"}
                transform={"translateX(-10px)"}
                opacity={0}
                _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
                justify={"flex-end"}
                align={"center"}
                flex={1}
              >
                <Icon color={"green.400"} w={5} h={5} as={ChevronRightIcon} />
              </Flex>
            </Stack>
          </ChakraLink>
        </Box>
      ) : (
        <Box
          to={`${to}`}
          role={"group"}
          display={"block"}
          p={2}
          rounded={"md"}
          _hover={{ bg: useColorModeValue("green.50", "gray.900") }}
        >
          <Stack direction={"row"} align={"center"}>
            <Box>
              <Text
                transition={"all .3s ease"}
                _groupHover={{ color: "green.400" }}
                fontWeight={500}
              >
                {label}
              </Text>
              <Text fontSize={"sm"}>{subLabel}</Text>
            </Box>
            <Flex
              transition={"all .3s ease"}
              transform={"translateX(-10px)"}
              opacity={0}
              _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
              justify={"flex-end"}
              align={"center"}
              flex={1}
            >
              <Icon color={"green.400"} w={5} h={5} as={ChevronRightIcon} />
            </Flex>
          </Stack>
        </Box>
      )}{" "}
    </>
  );
};

const navItems = [
  {
    name: "FRET",
    children: [
      {
        label: "Learn more",
        subLabel: "Learn more about FRET",
        to: "/fret",
      },
      {
        label: "Wikipedia",
        subLabel: "FRET's wikipedia page",
        href: "https://en.wikipedia.org/wiki/FRET_(Software)",
      },
    ],
  },
  {
    name: "OSRMT",
    children: [
      {
        label: "Learn more OSRMT",
        subLabel: "Trending Design to inspire you",
        to: "/osrmt",
      },
      // {
      //   label: "Wikipedia",
      //   subLabel: "OSRMT's wikipedia page",
      //   href: "#",
      // },
    ],
  },
];
