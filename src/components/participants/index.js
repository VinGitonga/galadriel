import { Box, Flex, Avatar, Text, HStack, IconButton } from "@chakra-ui/react";
import { useParticipant } from "@videosdk.live/react-sdk";
import {
    BsFillMicFill,
    BsFillMicMuteFill,
    BsCameraVideoFill,
    BsCameraVideoOffFill,
} from "react-icons/bs";

const Participant = ({ participantId }) => {
    const { displayName, micOn, webcamOn } = useParticipant(participantId);
    return (
        <Box mb={6}>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Flex alignItems={"center"}>
                    <Avatar
                        size="sm"
                        mr={5}
                        src={`https://avatars.dicebear.com/api/adventurer/${displayName}.svg`}
                    />
                    {/* To add a push state */}
                    <Text fontSize={"sm"}>{displayName}</Text>
                </Flex>
                <HStack spacing={4}>
                    <ActionIconBtn
                        ActiveIcon={BsFillMicFill}
                        InActiveIcon={BsFillMicMuteFill}
                        isActive={micOn}
                    />
                    <ActionIconBtn
                        ActiveIcon={BsCameraVideoFill}
                        InActiveIcon={BsCameraVideoOffFill}
                        isActive={webcamOn}
                    />
                </HStack>
            </Flex>
        </Box>
    );
};

const ActionIconBtn = ({ ActiveIcon, InActiveIcon, isActive }) => (
    <IconButton
        colorScheme={isActive ? "gray" : "red"}
        icon={isActive ? <ActiveIcon /> : <InActiveIcon />}
        rounded={"full"}
    />
);

export default Participant;
