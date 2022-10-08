import {
    Button,
    Box,
    chakra,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';


const Landing = () => {
    const navigate = useNavigate()
    return (
        <>
            <Navbar />
            <Box pos="relative" overflow="hidden" bg={"#1a202c"} h={"100vh"} fontFamily={"Poppins"}>
                <Box maxW="7xl" mx="auto">
                    <Box
                        pos="relative"
                        pb={{ base: 8, sm: 16, md: 20, lg: 28, xl: 32 }}
                        w="full"
                        border="solid 1px transparent"
                    >
                        <Box
                            mx="auto"
                            my={"auto"}
                            maxW={{ base: "7xl" }}
                            px={{ base: 4, sm: 6, lg: 8 }}
                            mt={{ base: 12, md: 16, lg: 20, xl: 28 }}
                        >
                            <Box
                                textAlign="center"
                                w={{ base: "full", md: 11 / 12, xl: 8 / 12 }}
                                mx="auto"
                            >
                                <chakra.h1
                                    fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
                                    letterSpacing="tight"
                                    lineHeight="short"
                                    fontWeight="extrabold"
                                    color={useColorModeValue("gray.900", "white")}
                                >
                                    <chakra.span
                                        display={{ base: "block", xl: "inline" }}
                                        color={"#cbceeb"}
                                    >
                                        Galadriel Video
                                    </chakra.span>
                                    <br />
                                </chakra.h1>
                                <chakra.p
                                    mt={{ base: 3, sm: 5, md: 5 }}
                                    mx={{ sm: "auto", lg: 0 }}
                                    mb={6}
                                    fontSize={{ base: "lg", md: "xl" }}
                                    color="gray.500"
                                    lineHeight="base"
                                >
                                    A secure app that allows student and lectures present their projects.
                                </chakra.p>
                                <Stack
                                    direction={{ base: "column", sm: "column", md: "row" }}
                                    mb={{ base: 4, md: 8 }}
                                    spacing={{ base: 4, md: 2 }}
                                    justifyContent="center"
                                >
                                    <Button
                                        bg="teal"
                                        color={"gray.900"}
                                        size="lg"
                                        onClick={() => navigate('/login')}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        bg="white"
                                        color={"gray.900"}
                                        size="lg"
                                        onClick={() => navigate('/register')}
                                    >
                                        Register
                                    </Button>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Landing