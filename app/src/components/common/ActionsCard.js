import {
    Flex,
    useColorModeValue,
    VStack,
    Text,
    Icon,
    Button,
} from "@chakra-ui/react";
import {
    BsFillMicFill,
    BsRecordCircle,
    BsFillMicMuteFill,
    BsCameraVideoFill,
    BsCameraVideoOffFill,
} from "react-icons/bs";
import { MdIosShare } from "react-icons/md";

const ActionsCard = ({
    onToggleMute,
    onToggleWebcam,
    onToggleScreenShare,
    micOn,
    webcamOn,
}) => (
    <Flex
        bg={useColorModeValue("#F9FAFB", "gray.600")}
        w="full"
        alignItems="center"
        justifyContent="center"
        pos="relative"
        mb={6}
        borderColor={"gray.200"}
        borderWidth={"2px"}
        rounded={"lg"}
    >
        <Flex
            px={4}
            py={4}
            rounded="lg"
            shadow="lg"
            bg={useColorModeValue("white", "gray.800")}
            w={"full"}
            align={"center"}
            justify={"space-evenly"}
        >
            {micOn ? (
                <ActionItem
                    IconName={BsFillMicFill}
                    text={"Mute"}
                    onClick={onToggleMute}
                />
            ) : (
                <ActionItem
                    IconName={BsFillMicMuteFill}
                    text={"UnMute"}
                    onClick={onToggleMute}
                />
            )}
            {webcamOn ? (
                <ActionItem
                    IconName={BsCameraVideoFill}
                    text={"Turn Off Webcam"}
                    onClick={onToggleWebcam}
                />
            ) : (
                <ActionItem
                    IconName={BsCameraVideoOffFill}
                    text={"Turn On Webcam"}
                    onClick={onToggleWebcam}
                />
            )}
            <ActionItem
                IconName={MdIosShare}
                text={"Share Screen"}
                onClick={onToggleScreenShare}
            />
            <ActionItem IconName={BsRecordCircle} text={"Record"} />
        </Flex>
    </Flex>
);

const ActionItem = ({ IconName, text, onClick }) => (
    <VStack
        spacing={2}
        mx={4}
        as={Button}
        variant={"ghost"}
        onClick={onClick ? onClick : () => {}}
    >
        <Icon as={IconName} mt={4} />
        <Text fontSize={"sm"}>{text}</Text>
    </VStack>
);

export default ActionsCard;
