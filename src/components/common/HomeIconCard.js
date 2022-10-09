import { Center, Icon, VStack, Text, Button } from "@chakra-ui/react";
import { FcVideoCall } from "react-icons/fc";

const HomeIconCard = ({ IconName, bgColor = "blue.400", text }) => {
    return (
        <VStack spacing={6}>
            <Center
                w={"160px"}
                h={"160px"}
                bg={bgColor}
                color={"white"}
                borderRadius={"3xl"}
                as={Button}
                variant={"ghost"}
                _hover={{bgColor: bgColor ? "inherit" : bgColor}}
            >
                <Icon
                    as={IconName ? IconName : FcVideoCall}
                    w={"90px"}
                    h={"90px"}
                    color={"white"}
                    _hover={{bgColor:bgColor}}
                />
            </Center>
            <Text fontSize={"lg"}>{text}</Text>
        </VStack>
    );
};

export default HomeIconCard;
