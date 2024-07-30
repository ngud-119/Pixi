"use client";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  List,
  ListItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
  useColorModeValue,
  Slide,
  Stack,
  Text,
  Textarea,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useRadioGroup, useCheckboxGroup } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import { selectChart } from "@/store/chartSlice";
import { editNode } from "@/store/chartSlice";
import { checkOpen } from "@/store/panelSlice";
import RadioCard from "@/components/RadioCard";
import { Manager } from "@/visualizations/manager";
import { onToggle } from "@/store/panelSlice";

export default function SidePanel() {
  const dispatch = useDispatch();
  const jsonData = useSelector(selectChart);
  const panelData = useSelector(checkOpen);
  const isOpen = panelData.isOpen;
  const nodeID = panelData.nodeID;

  const keywords = ["Christianity", "Pets", "Norway"];
  const profile = ["Jake", "Jane"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "Profile",
    defaultValue: "Jake",
    onChange: () => {},
  });
  const changeTitle = (e: Event) => {
    const newTitle = e.target.textContent;

    Manager.jsonData[nodeID]["ray"]["content"]["title"] = newTitle;
    Manager.currentScene.getChildByLabel(nodeID).changeText(newTitle);
  };
  const changeDescription = (e: Event) => {
    const newDescription = e.target.textContent;
    Manager.jsonData[nodeID]["ray"]["content"]["description"] = newDescription;
  };
  const saveTitle = (e: Event) => {
    dispatch(editNode({ id: nodeID, title: e.target.textContent }));
  };
  const saveDescription = (e: Event) => {
    dispatch(editNode({ id: nodeID, description: e.target.textContent }));
  };
  return (
    <Box position="absolute" left="100vw" top="0vh" height="100vh">
      <Slide
        direction="right"
        in={isOpen}
        style={{
          zIndex: 10,
          maxWidth: "30vw",
          overflowY: "auto",
          overflowX: "hidden",
          background: "#eeeeee",
        }}
      >
        <HStack
          bg="#eeeeee"
          height="fit-content"
          width="100%"
          alignItems="flex-start"
          spacing="0"
          borderLeft="2px solid #dedad9"
        >
          <Flex
            flexDir={"column"}
            position="relative"
            pl="10"
            justifyContent="space-between"
            minH={"100vh"}
          >
            <Box>
              <Navbar />
              <Heading
                contentEditable={true}
                as="h2"
                size="md"
                mb={5}
                onKeyUp={changeTitle}
                onBlur={saveTitle}
                _focus={{
                  outline: "none",
                  border: "none",
                  boxShadow: "none",
                  resize: "none",
                }}
                _hover={{
                  outline: "none",
                  border: "none",
                  boxShadow: "none",
                  resize: "none",
                }}
              >
                {jsonData && nodeID && jsonData[nodeID]
                  ? jsonData[nodeID]["ray"]["content"]["title"]
                  : undefined}
              </Heading>
              <Text
                contentEditable={true}
                color="#7E7A79"
                fontSize="sm"
                mb={5}
                _focus={{
                  outline: "none",
                  border: "none",
                  boxShadow: "none",
                  resize: "none",
                }}
                _hover={{
                  outline: "none",
                  border: "none",
                  boxShadow: "none",
                  resize: "none",
                }}
                onKeyUp={changeDescription}
                onBlur={saveDescription}
              >
                {jsonData && nodeID && jsonData[nodeID]
                  ? jsonData[nodeID]["ray"]["content"]["description"]
                  : undefined}
              </Text>

              <List
                position="relative"
                _before={{
                  content: '""',
                  position: "absolute",
                  top: "-12px",
                  left: "-3px",
                  width: "22px",
                  height: "100%",
                  borderLeft: "4px solid #C1C1C1",
                }}
                pl={5}
              >
                {jsonData && nodeID && jsonData[nodeID]
                  ? jsonData[nodeID]["ray"]["children"].map((childID) => {
                      return (
                        <ListItem
                          key={`${nodeID}-${childID}`}
                          position="relative"
                          _before={{
                            content: '""',
                            position: "absolute",
                            top: "10px",
                            left: "-24px",
                            width: "22px",
                            height: "5px",
                            borderLeft: "1px solid #C1C1C1",
                            borderBottom: "3px solid #C1C1C1",
                          }}
                          mb={5}
                          px={5}
                          border={"2px solid #DEDAD9"}
                          borderRadius="7px"
                          textAlign="center"
                          maxWidth="85%"
                        >
                          {jsonData[childID]["ray"]["content"]["title"]}
                        </ListItem>
                      );
                    })
                  : undefined}
              </List>

              <Textarea
                minHeight="20vh"
                placeholder="Add your own notes here..."
                mb={5}
                outline="none"
                border="none"
                box-shadow="none"
                resize="none"
                _focus={{
                  outline: "none",
                  border: "none",
                  boxShadow: "none",
                  resize: "none",
                }}
                _hover={{
                  outline: "none",
                  border: "none",
                  boxShadow: "none",
                  resize: "none",
                }}
              />
            </Box>

            <Box>
              <FormControl>
                <FormLabel color="#7E7A79" fontSize={"md"}>
                  Link to...{" "}
                </FormLabel>

                <HStack
                  alignItems="center"
                  justifyContent="center"
                  bg="#DEDAD9"
                  width="2em"
                  height="2em"
                  borderRadius="80px"
                  mb={5}
                >
                  <AddIcon color="white" boxSize="1em" />
                </HStack>
              </FormControl>
              <FormControl>
                <FormLabel color="#7E7A79" fontSize={"md"}>
                  Saved keyword/topic
                </FormLabel>

                <HStack>
                  {keywords.map((value) => {
                    return <KeyWord key={Math.random()} child={value} />;
                  })}
                </HStack>
              </FormControl>
              <Divider borderWidth="3px" color="#C1C1C1" my={5} />
              <FormControl pb={5}>
                <FormLabel color="#7E7A79" fontSize={"md"}>
                  User Profile
                </FormLabel>

                <HStack>
                  {profile.map((value, i) => {
                    const radio = getRadioProps({ value });
                    return (
                      <Box key={i} onClick={() => {}}>
                        <RadioCard {...radio}>{value}</RadioCard>
                      </Box>
                    );
                  })}
                </HStack>
              </FormControl>
              <Flex justifyContent="flex-end">
                <Button
                  bg="none"
                  color="grey"
                  fontWeight={400}
                  rounded={"16"}
                  border="2px solid #DEDAD9"
                  mr={6}
                  mb={10}
                  _hover={{
                    color: "black",
                  }}
                  size={"md"}
                  onClick={() => {
                    dispatch(onToggle(false));
                  }}
                >
                  Confirm
                </Button>
              </Flex>
            </Box>
          </Flex>
        </HStack>
      </Slide>
    </Box>
  );
}

const KeyWord = ({ child }) => {
  return (
    <Box as="label">
      <Box
        border="2px solid #dd822c"
        color="#dd822c"
        cursor="pointer"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "#dd822c",
          color: "white",
        }}
        px={5}
        py={1}
      >
        {child}
      </Box>
    </Box>
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
          pl={5}
          rounded={"md"}
          _hover={{
            bg: "gray.700",
          }}
        >
          <ChakraLink as="a" href={href} _hover={{}} isExternal>
            <Stack direction={"row"} align={"center"}>
              <Box>
                <Text
                  transition={"all .3s ease"}
                  _groupHover={{ color: "gray.400" }}
                  fontWeight={500}
                >
                  {label}
                </Text>
              </Box>
              <Flex
                transition={"all .3s ease"}
                transform={"translateX(-10px)"}
                opacity={0}
                _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
                justify={"flex-end"}
                align={"center"}
                flex={1}
              ></Flex>
            </Stack>
          </ChakraLink>
        </Box>
      ) : (
        <Box
          to={`${to}`}
          role={"group"}
          display={"block"}
          p={2}
          pl={5}
          rounded={"md"}
          _hover={{
            bg: "gray.700",
          }}
        >
          <Stack direction={"row"} align={"center"}>
            <Box>
              <Text
                transition={"all .3s ease"}
                _groupHover={{ color: "gray.400" }}
                fontWeight={500}
              >
                {label}
              </Text>
            </Box>
          </Stack>
        </Box>
      )}{" "}
    </>
  );
};

const Navbar = () => {
  return (
    <Flex justifyContent={"flex-end"}>
      <Popover trigger={"hover"} placement={"bottom-start"}>
        <PopoverTrigger>
          <Button
            bg="none"
            color="grey"
            rounded={"8"}
            _hover={{
              color: "black",
            }}
            size={"lg"}
            mr={4}
          >
            <BsThreeDotsVertical />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          bg="gray"
          border={0}
          m={0}
          boxShadow={"xl"}
          rounded={"xl"}
          minW={"sm"}
          width="200px"
        >
          <Stack p={0}>
            {navItems.children.map((child) => (
              <DesktopSubNav key={child.label} {...child} />
            ))}
          </Stack>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};
const navItems = {
  name: "FRET",
  children: [
    {
      label: "Save as Keyword/Topic",
      to: "/mindmap",
    },
    {
      label: "Placeholder",
      href: "https://prism-mindmap.vercel.app/mindmap",
    },
    {
      label: "Delete",
      href: "https://prism-mindmap.vercel.app/mindmap",
    },
  ],
};
