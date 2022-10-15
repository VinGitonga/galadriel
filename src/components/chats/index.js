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
import { usePubSub } from "@videosdk.live/react-sdk";
import { useState } from "react";
import { formatAMPM } from "../../utils/utils";

const Feed = () => {
    const { publish, messages } = usePubSub("CHAT", {});

    const [msg, setMsg] = useState("");

    const publishMsg = () => {
        const m = msg;
        if (m.length) {
            publish(m, { persist: true });
            setMsg("");
        }
    };

    return (
        <>
            <Box
                maxH={"70vh"}
                h={"full"}
                w={"full"}
                padding={"4"}
                overflowY={"scroll"}
            >
                {messages?.map((item, i) => {
                    const { senderName, message: text, timestamp } = item;

                    return (
                        <MessageItem
                            message={text}
                            timestamp={timestamp}
                            senderName={senderName}
                            key={i}
                        />
                    );
                })}
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
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                    />
                </GridItem>
                <GridItem colSpan={2}>
                    <IconButton
                        icon={<RiSendPlaneFill />}
                        colorScheme={"teal"}
                        size={"lg"}
                        isRound
                        type="submit"
                        onClick={publishMsg}
                    />
                </GridItem>
            </SimpleGrid>
        </>
    );
};

const MessageItem = ({ message, timestamp, senderName }) => (
    <Box my={2}>
        <Flex alignItems={"center"}>
            <Avatar
                size="sm"
                mr={5}
                src={`https://avatars.dicebear.com/api/adventurer/${senderName}.svg`}
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
                            {senderName}
                        </Text>
                        <Text fontSize={"10px"}>
                            {formatAMPM(new Date(timestamp))}
                        </Text>
                    </Flex>
                    <Text fontSize={"10px"} noOfLines={[1, 2, 3]}>
                        {message}
                    </Text>
                </Box>
            </Box>
        </Flex>
    </Box>
);

export default Feed;
