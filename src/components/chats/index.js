import {
    Box,
    SimpleGrid,
    GridItem,
    VisuallyHidden,
    Input,
    IconButton,
    Text,
    Flex,
    Avatar,
} from "@chakra-ui/react";
import { RiSendPlaneFill } from "react-icons/ri";

const Feed = () => {
    return (
        <>
            <Box
                maxH={"70vh"}
                h={"full"}
                w={"full"}
                padding={"24px"}
                overflowY={"scroll"}
            >
                {[...Array(10)].map((_, i) => (
                    <MessageItem key={i} />
                ))}
            </Box>
            <SimpleGrid
                as="form"
                w={"full"}
                columns={12}
                spacing={3}
                pt={1}
                mx="auto"
                mt={3}
            >
                <GridItem as="label" colSpan={10}>
                    <VisuallyHidden>Message</VisuallyHidden>
                    <Input
                        mt={0}
                        size="md"
                        placeholder="Type a message..."
                        required="true"
                    />
                </GridItem>
                <GridItem colSpan={2}>
                    <IconButton
                        icon={<RiSendPlaneFill />}
                        colorScheme={"teal"}
                        size={"lg"}
                        isRound
                        type="submit"
                    />
                </GridItem>
            </SimpleGrid>
        </>
    );
};

const MessageItem = () => (
    <Box my={2}>
        <Flex alignItems={"center"}>
            <Avatar
                size="sm"
                mr={5}
                src={
                    "https://avatars.dicebear.com/api/adventurer/rileydavies.svg"
                }
            />
            <Box
                border="1px"
                borderColor="gray.200"
                boxShadow={"md"}
                borderRadius={"md"}
            >
                <Box p={"2"}>
                    <Flex justify={"space-between"} align={"center"}>
                        <Text fontSize={"sm"} color={"gray.700"} my={2}>
                            {"Riley Davies"}
                        </Text>
                        <Text fontSize={"10px"}>10m ago</Text>
                    </Flex>
                    <Text fontSize={"10px"} noOfLines={[1, 2, 3]}>
                        The quick brown fox jumps over the lazy dog is an
                        English-language pangram—a sentence that contains all of
                        the letters of the English alphabet. Owing to its
                        existence, Chakra was created.
                    </Text>
                </Box>
            </Box>
        </Flex>
    </Box>
);

export default Feed;
