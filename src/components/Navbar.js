import { Flex, Icon, Text, Image } from "@chakra-ui/react";
import { FcVideoCall } from "react-icons/fc";

const Navbar = () => {
    let name = "Malcom Whitley";
    return (
        <Flex
            fontFamily="Poppins"
            mx="auto"
            justifyContent="space-between"
            alignItems={"center"}
            w={"100%"}
            px="8"
        >
            <Flex align="center" py="3">
                <Icon w={6} h={6} as={FcVideoCall} mr={3} color={"gray.800"} />
                <Text fontWeight="semibold" fontSize="lg" color={"teal.500"}>
                    Galadriel
                </Text>
            </Flex>
            <Flex align="center" px="4" py="3">
                <Flex alignItems="center" ml={3}>
                    <Image
                        h={10}
                        fit="cover"
                        rounded="full"
                        src={`https://avatars.dicebear.com/api/adventurer/${name
                            .toLowerCase()
                            .replaceAll(" ", "")}.svg`}
                        alt="Avatar"
                    />
                    <Text mx={2} fontWeight="bold" color="gray.700">
                        {"Malcom Whitley"}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Navbar;
