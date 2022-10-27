import {
    SimpleGrid,
    Box,
    GridItem,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Flex,
    Icon,
    VStack,
    Text,
    chakra,
    useColorModeValue,
} from "@chakra-ui/react";
import { FileIcon, defaultStyles } from "react-file-icon";
import { MdOutlineMoreVert, MdCloudDownload } from "react-icons/md";
import { BsFillFileEarmarkFill } from "react-icons/bs";
import { saveAs } from "file-saver";

const getFileExtension = (filename = "Screenshot.png", toUpper = false) =>
    toUpper
        ? filename.split(".").pop().toUpperCase()
        : filename.split(".").pop();

export default function ResourceItem({ item }) {
    return (
        <VStack spacing={2} mr={4} mt={4}>
            <Box
                p={4}
                mx={"auto"}
                w={36}
                bg={useColorModeValue("white", "gray.800")}
                rounded={"lg"}
                shadow={"lg"}
            >
                <SimpleGrid w={"full"} columns={12}>
                    <GridItem colSpan={9}>
                        <FileIcon
                            extension={getFileExtension(item?.filename)}
                            {...defaultStyles[getFileExtension(item?.filename)]}
                            labelUppercase={true}
                        />
                    </GridItem>
                    <GridItem colSpan={3}>
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label="Options"
                                icon={<MdOutlineMoreVert />}
                                variant="outline"
                                isRound
                            />
                            <MenuList>
                                <MenuItem
                                    icon={<MdCloudDownload />}
                                    onClick={() =>
                                        saveAs(
                                            item?.downloadUrl,
                                            item?.filename
                                        )
                                    }
                                >
                                    Download
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </GridItem>
                </SimpleGrid>
            </Box>
            <Flex align={"center"} w={48} px={2}>
                <Icon
                    as={BsFillFileEarmarkFill}
                    w={6}
                    h={6}
                    color={"blue.500"}
                    mr={2}
                />
                <VStack spacing={2}>
                    <Text fontSize={"lg"}>{item?.filename}</Text>
                    <Box>
                        <chakra.span fontStyle={"italic"}>
                            Added By:
                        </chakra.span>
                        <Text fontSize={"sm"} color={"gray.400"}>
                            {item?.addedByName}
                        </Text>
                    </Box>
                </VStack>
            </Flex>
        </VStack>
    );
}
