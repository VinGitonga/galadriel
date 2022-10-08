import { Box, Flex, Avatar, Text, HStack, Icon } from "@chakra-ui/react";
import { BsFillMicFill } from "react-icons/bs";
import { FcVideoCall } from "react-icons/fc";

const Participant = () => {
    return (
        <Box mb={6}>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Flex alignItems={"center"}>
                    <Avatar
                        size="sm"
                        mr={5}
                        src={"https://avatars.dicebear.com/api/adventurer/dylannkent.svg"}
                    />
                    {/* To add a push state */}
                    <Text fontSize={"sm"}>{"Dylann Kent"}</Text>
                </Flex>
                <HStack spacing={4}>
                    <Icon as={BsFillMicFill} />
                    <Icon as={FcVideoCall} />
                </HStack>
            </Flex>
        </Box>
    );
};

export default Participant;
