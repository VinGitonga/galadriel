import {
    Flex,
    Stack,
    Heading,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Icon,
    Button,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Tooltip,
    useColorModeValue,
    InputRightElement,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdTitle } from "react-icons/md";
import { BiUser, BiLock } from "react-icons/bi";
import { BsCalendar2Event } from "react-icons/bs";
import { RiTimerFlashFill } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { nanoid } from "nanoid";
import MeetingCreatedDetails from "../components/meeting/MeetingCreatedDetails";
import { DateTime } from "luxon";
import { createMeeting, getToken } from "../api";
import { addDoc, collection, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function formatDate(dateString = "2012") {
    let dateObj = new Date(dateString);
    let dateISO = dateObj.toISOString();
    let formattedDate = DateTime.fromISO(dateISO, { zone: "Africa/Nairobi" })
        .setLocale("en-US")
        .toFormat("fff");
    return formattedDate;
}

export default function NewMeeting() {
    const params = useParams();
    const [meetingTitle, setMeetingTitle] = useState("");
    const [meetingId, setMeetingId] = useState(null);
    const [meetingPasscode, setMeetingPasscode] = useState("");
    const [hostName, setHostName] = useState("");
    const [scheduledFor, setScheduledFor] = useState("");
    const [meetingDuration, setMeetingDuration] = useState(30);
    const [showDurationTooltip, setShowDurationTooltip] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [meetingDetails, setMeetingDetails] = useState(null);
    const [copyText, setCopyText] = useState("");
    const [roomDetails, setRoomDetails] = useState(null);
    const toast = useToast();
    const navigate = useNavigate();

    const customToast = ({ title, status }) => {
        return toast({
            title: title,
            status: status,
            isClosable: true,
            duration: 6000,
        });
    };

    const clickSubmit = async () => {
        if (!meetingTitle || !hostName || !scheduledFor || !meetingPasscode) {
            customToast({
                title: "Please fill all the fields",
                status: "success",
            });
            return;
        } else {
            setLoading(true);

            // create meeting
            const token = await getToken();
            const { roomId } = await createMeeting({ token });
            setMeetingId(roomId);

            let content = {
                meetingTitle,
                meetingHost: hostName,
                meetingId: roomId,
                meetingPasscode,
                scheduledFor,
                roomTitle: roomDetails?.roomTitle,
                duration: meetingDuration,
                meetingRoomId: params?.roomId,
            };

            let textContent = `
                Meeting-Title: ${content?.meetingTitle}\n \
                Host: ${content?.meetingHost}\n \
                Meeting ID: ${roomId}\n \
                Meeting-Passcode: ${content?.meetingPasscode}\n \
                Scheduled-For: ${formatDate(content?.scheduledFor)}\n \
                Room-Title: ${content?.roomTitle}\n \
                Duration: ${content?.duration} minutes\n \
            `;

            // save to firebase
            await addDoc(collection(db, "meetings"), content)
                .then(() => {
                    customToast({
                        title: "Meeting Scheduled and saved successfully",
                        status: "success",
                    });
                    setCopyText(textContent);
                    setMeetingDetails(content);
                    setLoading(false);
                    setShowModal(true);
                    navigate(`/room/${params?.roomId}`);
                })
                .catch(() => {
                    customToast({
                        title: "Something went wrong when creating meeting",
                        status: "error",
                    });
                    setLoading(false);
                });
        }
    };

    const getRoomDetails = async () => {
        const roomRef = doc(db, "rooms", params?.roomId);
        const roomSnap = await getDoc(roomRef);
        setRoomDetails({ id: roomSnap.id, ...roomSnap.data() });
    };

    const generatePasscode = () => {
        let passcode = nanoid(8);
        setMeetingPasscode(passcode);
    };

    useEffect(() => {
        getRoomDetails();
    }, [params]);

    return (
        <>
            <Helmet>
                <title>TheRoom | Schedule Meeting</title>
            </Helmet>
            <MeetingCreatedDetails
                content={meetingDetails}
                open={showModal}
                setOpen={setShowModal}
                copyText={copyText}
            />
            <Flex
                minH={"100vh"}
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontFamily={"Poppins"}
            >
                <Stack spacing={8} mx={"auto"} w={"600px"}>
                    <Stack align={"center"}>
                        <Heading fontSize={"4xl"}>Create New Meeting</Heading>
                    </Stack>
                    <Box
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        p={8}
                    >
                        <Stack spacing={4}>
                            <FormControl id="meetingTitle">
                                <FormLabel>Meeting Title</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <Icon as={MdTitle} w={4} h={4} />
                                    </InputLeftElement>

                                    <Input
                                        type="text"
                                        variant={"flushed"}
                                        color={"gray.500"}
                                        placeholder={"Data Structures & Algos"}
                                        value={meetingTitle}
                                        onChange={(e) =>
                                            setMeetingTitle(e.target.value)
                                        }
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="hostName">
                                <FormLabel>Host Name</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <Icon as={BiUser} w={4} h={4} />
                                    </InputLeftElement>
                                    <Input
                                        variant={"flushed"}
                                        color={"gray.500"}
                                        value={hostName}
                                        onChange={(e) =>
                                            setHostName(e.target.value)
                                        }
                                        placeholder={"Dr. Arthur"}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="scheduledFor">
                                <FormLabel>Scheduled For</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <Icon
                                            as={BsCalendar2Event}
                                            w={4}
                                            h={4}
                                        />
                                    </InputLeftElement>
                                    <Input
                                        variant={"flushed"}
                                        color={"gray.500"}
                                        value={scheduledFor}
                                        onChange={(e) =>
                                            setScheduledFor(e.target.value)
                                        }
                                        type={"datetime-local"}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="meetingDuration">
                                <FormLabel>Meeting Duration</FormLabel>
                                <Slider
                                    id="slider"
                                    defaultValue={30}
                                    min={0}
                                    max={300}
                                    colorScheme="teal"
                                    onChange={(v) => setMeetingDuration(v)}
                                    onMouseEnter={() =>
                                        setShowDurationTooltip(true)
                                    }
                                    onMouseLeave={() =>
                                        setShowDurationTooltip(false)
                                    }
                                >
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <Tooltip
                                        hasArrow
                                        bg="teal.500"
                                        color="white"
                                        placement="top"
                                        isOpen={showDurationTooltip}
                                        label={`${meetingDuration} min`}
                                    >
                                        <SliderThumb boxSize={6}>
                                            <Box
                                                color={"teal.500"}
                                                as={RiTimerFlashFill}
                                            />
                                        </SliderThumb>
                                    </Tooltip>
                                </Slider>
                            </FormControl>
                            <FormControl id="meetingPasscode">
                                <FormLabel>Meeting Passcode</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <Icon as={BiLock} w={4} h={4} />
                                    </InputLeftElement>
                                    <Input
                                        variant={"flushed"}
                                        color={"gray.500"}
                                        placeholder={"Room Passcode"}
                                        value={meetingPasscode}
                                        onChange={(e) =>
                                            setMeetingPasscode(e.target.value)
                                        }
                                    />
                                    <InputRightElement>
                                        <Button
                                            size={"sm"}
                                            colorScheme={"cyan"}
                                            onClick={generatePasscode}
                                        >
                                            Generate
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>

                            <Button
                                bg={"blue.400"}
                                color={"white"}
                                isLoading={loading}
                                loadingText={"Creating New Meeting ..."}
                                onClick={clickSubmit}
                                mt={10}
                                leftIcon={<FiEdit3 />}
                                _hover={{
                                    bg: "blue.500",
                                }}
                                disabled={loading}
                            >
                                Submit
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
}
