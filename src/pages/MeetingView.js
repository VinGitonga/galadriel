import {
    Flex,
    Box,
    chakra,
    SimpleGrid,
    GridItem,
    Tabs,
    TabList,
    Tab,
    TabPanel,
    TabPanels,
    Icon,
    Square,
    HStack,
    Button,
} from "@chakra-ui/react";
import Chats from "../components/chats";
import { BsFillMicFill } from "react-icons/bs";
import { FcVideoCall } from "react-icons/fc";
import { ImPhoneHangUp } from "react-icons/im";
import Navbar from "../components/Navbar";
import Card from "../components/common/Card";
import Participant from "../components/participants";
import ActionsCard from "../components/common/ActionsCard";

const MeetingView = () => {
    return (
        <>
            <Navbar />
            <Box px={4} py={4} mx="auto" fontFamily={"Poppins"}>
                <SimpleGrid
                    w={{ base: "full", xl: 11 / 12 }}
                    columns={{ base: 1, lg: 11 }}
                    gap={{ base: 0, lg: 8 }}
                    mx="auto"
                >
                    <GridItem colSpan={{ base: "auto", md: 7 }}>
                        <SimpleGrid columns={[1, null, 2]} spacing={"10"}>
                            {[...Array(4)].map((_, i) => (
                                <Item key={i} />
                            ))}
                        </SimpleGrid>
                        <HStack my={5} spacing={6} align={"center"} mx={4} >
                            <ActionsCard />
                            <Square
                                color={"white"}
                                bg={"red.500"}
                                size={"40px"}
                                borderRadius={"md"}
                                as={Button}
                            >
                                <Icon as={ImPhoneHangUp} w={7} h={7} />
                            </Square>
                        </HStack>
                    </GridItem>
                    <GridItem colSpan={{ base: "auto", lg: 4 }}>
                        <Card>
                            <Tabs isFitted variant="enclosed">
                                <TabList mb="1em">
                                    <Tab>Chats</Tab>
                                    <Tab>Participants</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <Chats />
                                    </TabPanel>
                                    <TabPanel>
                                        <Box
                                            maxH={"70vh"}
                                            h={"full"}
                                            w={"full"}
                                            padding={"24px"}
                                            overflowY={"scroll"}
                                        >
                                            {[...Array(10)].map((_, i) => (
                                                <Participant key={i} />
                                            ))}
                                        </Box>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Card>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </>
    );
};

const Item = () => (
    <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        w="130"
        // mx="auto"
    >
        <Box
            bg="gray.300"
            h={56}
            w="full"
            rounded="xl"
            shadow="md"
            bgSize="cover"
            bgPos="center"
            style={{
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1521903062400-b80f2cb8cb9d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80)",
            }}
        ></Box>

        <Box
            w={200}
            bg="white"
            _dark={{
                bg: "gray.800",
            }}
            mt={-10}
            shadow="lg"
            rounded="lg"
            overflow="hidden"
        >
            <chakra.h3
                py={2}
                textAlign="center"
                fontWeight="bold"
                textTransform="uppercase"
                color="gray.800"
                _dark={{
                    color: "white",
                }}
                letterSpacing={1}
            >
                Riley Davies
            </chakra.h3>

            <Flex
                alignItems="center"
                justifyContent="space-between"
                py={2}
                px={3}
                bg="gray.200"
                _dark={{
                    bg: "gray.700",
                }}
            >
                <chakra.span
                    fontWeight="bold"
                    color="gray.800"
                    _dark={{
                        color: "gray.200",
                    }}
                >
                    <BsFillMicFill />
                </chakra.span>
                <chakra.span
                    fontWeight="bold"
                    color="gray.800"
                    _dark={{
                        color: "gray.200",
                    }}
                >
                    <FcVideoCall />
                </chakra.span>
            </Flex>
        </Box>
    </Flex>
);

export default MeetingView;
