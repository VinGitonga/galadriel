import { useState } from "react";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Icon,
    IconButton,
    useToast,
} from "@chakra-ui/react";
import { RiLoginCircleFill } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { BiLock } from "react-icons/bi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../context/auth";


export default function Login() {
    const toast = useToast();
    const { fetchUser } = useAuth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const navigate = useNavigate();

    const handleShowPass = () => setShowPass(!showPass);

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setLoading(false);
    };


    const clickSubmit = async () => {
        let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!email || !password) {
            toast({
                title: "Error",
                status: "error",
                duration: 5000,
                isClosable: true,
                description: "Please fill all the inputs.",
            });
            return;
        } else if (!emailRegex.test(email)) {
            toast({
                title: "Error",
                status: "error",
                duration: 5000,
                isClosable: true,
                description: "Please input a valid email address",
            });
            return;
        } else if (password.length < 8) {
            toast({
                title: "Error",
                status: "error",
                duration: 5000,
                isClosable: true,
                description: "Passwords must be at least 8 characters",
            });
            return;
        } else {
            setLoading(true)
            signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    console.log(userCredential.user)
                    await fetchUser(userCredential.user.uid)
                    resetForm();
                    toast({
                        title: "Success",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        description: "You've successfully logged In",
                    });
                    navigate("/home");
                })
                .catch((err) => {
                    setLoading(false)
                    toast({
                        title: "Error",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        description: err.message,
                    });
                });
        }
    };

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontFamily={"Poppins"}
        >
            <Stack spacing={8} mx={"auto"} w={"450px"}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Welcome Back</Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        Signin to your account
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <InputGroup>
                                <InputLeftElement>
                                    <Icon as={HiOutlineMail} w={4} h={4} />
                                </InputLeftElement>
                                <Input
                                    type="email"
                                    variant={"flushed"}
                                    color={"gray.500"}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={"jack@outlook.com"}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <InputLeftElement>
                                    <Icon as={BiLock} w={4} h={4} />
                                </InputLeftElement>
                                <Input
                                    type={showPass ? "text" : "password"}
                                    variant={"flushed"}
                                    color={"gray.500"}
                                    placeholder={"Password"}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <InputRightElement>
                                    <IconButton
                                        size={"sm"}
                                        aria-label={"password"}
                                        icon={
                                            showPass ? <FiEye /> : <FiEyeOff />
                                        }
                                        isRound
                                        onClick={handleShowPass}
                                        bg={"gray.300"}
                                    />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: "column", sm: "row" }}
                                align={"start"}
                                justify={"space-between"}
                            >
                                <Checkbox>Remember me</Checkbox>
                                <Link color={"blue.400"}>Forgot password?</Link>
                            </Stack>
                            <Button
                                bg={"blue.400"}
                                color={"white"}
                                leftIcon={<RiLoginCircleFill />}
                                isLoading={loading}
                                loadingText={"Authenticating ..."}
                                onClick={clickSubmit}
                                _hover={{
                                    bg: "blue.500",
                                }}
                            >
                                Sign in
                            </Button>
                            <Link
                                color={"blue.400"}
                                onClick={() => navigate("/register")}
                            >
                                {" "}
                                Don&apos;t have an account? Register
                            </Link>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
