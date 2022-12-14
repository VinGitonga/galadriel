import { useState } from "react";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    IconButton,
    Icon,
    Link,
    useToast,
} from "@chakra-ui/react";
import { RiLoginCircleFill } from "react-icons/ri";
import { FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { BiLock } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import {Helmet} from "react-helmet"

export default function Register() {
    const toast = useToast();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();

    const handleShowPass = () => setShowPass(!showPass);

    const resetForm = () => {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setLoading(false);
    };

    const clickSubmit = async () => {
        let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!email || !password || !name) {
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
        } else if (name.length < 3) {
            toast({
                title: "Error",
                status: "error",
                duration: 5000,
                isClosable: true,
                description: "Name must be at least 3 characters",
            });
            return;
        } else if (password !== confirmPassword) {
            toast({
                title: "Error",
                status: "error",
                duration: 5000,
                isClosable: true,
                description: "Passwords dont match",
            });
            return;
        } else {
            setLoading(true);
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCred) => {
                    const userRef = doc(db, "users", userCred.user.uid);
                    setDoc(userRef, { name, email });
                    resetForm();
                    toast({
                        title: "Success",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        description:
                            "Your Account has been created successfully",
                    });
                    navigate("/login");
                })
                .catch((err) => {
                    toast({
                        title: "Error",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        description: err.message,
                    });
                    return;
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
            <Helmet>
                <title>TheRoom | Register</title>
            </Helmet>
            <Stack spacing={8} mx={"auto"} w={"600px"}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>
                        Get Started with Galadriel
                    </Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        Create an account
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="name">
                            <FormLabel>Name</FormLabel>
                            <InputGroup>
                                <InputLeftElement>
                                    <Icon as={FiUser} w={4} h={4} />
                                </InputLeftElement>

                                <Input
                                    type="text"
                                    variant={"flushed"}
                                    color={"gray.500"}
                                    placeholder={"Jack Ryan"}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </InputGroup>
                        </FormControl>
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
                                        aria-label={"type"}
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
                        <FormControl id="confirmPassword">
                            <FormLabel>Confirm Password</FormLabel>
                            <InputGroup>
                                <InputLeftElement>
                                    <Icon as={BiLock} w={4} h={4} />
                                </InputLeftElement>
                                <Input
                                    type={showPass ? "text" : "password"}
                                    variant={"flushed"}
                                    color={"gray.500"}
                                    placeholder={"Confirm Password"}
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                                <InputRightElement>
                                    <IconButton
                                        size={"sm"}
                                        aria-label={"type"}
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

                        <Button
                            bg={"blue.400"}
                            color={"white"}
                            isLoading={loading}
                            loadingText={"Saving your info ..."}
                            onClick={clickSubmit}
                            mt={10}
                            leftIcon={<RiLoginCircleFill />}
                            _hover={{
                                bg: "blue.500",
                            }}
                        >
                            Sign up
                        </Button>
                        <Link
                            color={"blue.400"}
                            onClick={() => navigate("/login")}
                        >
                            {" "}
                            Already have an account? Login
                        </Link>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
