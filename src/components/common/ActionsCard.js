import {
    Flex,
    useColorModeValue,
    VStack,
    Text,
    Icon,
    Button,
} from "@chakra-ui/react";
import { BsFillMicFill, BsRecordCircle } from "react-icons/bs";
import { FcVideoCall } from "react-icons/fc";
import {MdIosShare} from "react-icons/md"

const ActionsCard = () => (
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
            <ActionItem IconName={BsFillMicFill} text={"Mute"} />
            <ActionItem IconName={FcVideoCall} text={"Video"} />
            <ActionItem IconName={MdIosShare} text={"Share Screen"} />
            <ActionItem IconName={BsRecordCircle} text={"Record"} />
        </Flex>
    </Flex>
);

const ActionItem = ({ IconName, text }) => (
    <VStack spacing={2} mx={4} as={Button} variant={"ghost"}>
        <Icon as={IconName} mt={4} />
        <Text fontSize={"sm"}>{text}</Text>
    </VStack>
);

export default ActionsCard;
