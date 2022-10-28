import {
    Flex,
    Stack,
    Heading,
    Text,
    Box,
    FormControl,
    useColorModeValue,
    FormLabel,
    InputGroup,
    InputLeftElement,
    Input,
    InputRightElement,
    Button,
    Icon,
    IconButton,
    Tooltip,
    FormHelperText,
    useToast,
} from "@chakra-ui/react";
import { MdKeyboard } from "react-icons/md";
import { useState, useRef } from "react";
import {
    BsFillMicFill,
    BsFillMicMuteFill,
    BsCameraVideoFill,
    BsCameraVideoOffFill,
} from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { getToken, validateMeeting } from "../api";

export default function JoinMeeting() {
    const [meetingId, setMeetingId] = useState("");
    const [readyToJoin, setReadyToJoin] = useState(false);
    const videoPlayerRef = useRef(null);
    const [webcamOn, setWebcamOn] = useState(false);
    const [micOn, setMicOn] = useState(false);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const toast = useToast();

    const toggleWebcam = () => setWebcamOn(!webcamOn);
    const toggleMic = () => setMicOn(!micOn);

    const onClickJoin = async () => {
        let token = getToken();
        let valid = await validateMeeting({
            meetingId: meetingId,
            token,
        });

        if (valid) {
            setReadyToJoin(true);
            setMicOn(true);
            setWebcamOn(true);
        } else {
            toast({
                title: "Invalid Meeting ID",
                status: "error",
                isClosable: true,
                duration: 7000,
            });
            return;
        }
    };

    const onClickStart = () => {
        let state = {
            participantName: name,
            meetingId: meetingId,
            micOn: micOn,
            webcamOn: micOn,
        };

        navigate("/meeting-view", {
            state: state,
        });
    };

    return (
        <>
            {readyToJoin ? (
                <MeetingSetup
                    name={name}
                    setName={setName}
                    videoPlayerRef={videoPlayerRef}
                    webcamOn={webcamOn}
                    micOn={micOn}
                    toggleMic={toggleMic}
                    toggleWebcam={toggleWebcam}
                    setReadyToJoin={setReadyToJoin}
                    onClickStart={onClickStart}
                />
            ) : (
                <JoinInput
                    meetingId={meetingId}
                    setMeetingId={setMeetingId}
                    onClickJoin={onClickJoin}
                />
            )}
        </>
    );
}

const JoinInput = ({ meetingId, setMeetingId, onClickJoin }) => {
    return (
        <Flex
            minH={"80vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontFamily={"Poppins"}
        >
            <Stack spacing={4} mx={"auto"} w={"450px"}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Join Meeting</Heading>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <FormControl id="meetingId">
                        <FormLabel>Meeting ID</FormLabel>
                        <InputGroup>
                            <InputLeftElement>
                                <Icon as={MdKeyboard} w={6} h={6} />
                            </InputLeftElement>
                            <Input
                                variant={"outline"}
                                color={"gray.500"}
                                value={meetingId}
                                onChange={(e) => setMeetingId(e.target.value)}
                            />
                            <InputRightElement>
                                <Button
                                    disabled={
                                        !meetingId.match(
                                            "\\w{4}\\-\\w{4}\\-\\w{4}"
                                        )
                                    }
                                    colorScheme="teal"
                                    size="sm"
                                    onClick={onClickJoin}
                                >
                                    Join
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                </Box>
            </Stack>
        </Flex>
    );
};

const MeetingSetup = ({
    setReadyToJoin,
    videoPlayerRef,
    webcamOn,
    micOn,
    toggleMic,
    toggleWebcam,
    name,
    setName,
    onClickStart,
}) => {
    const videoStyles = {
        borderRadius: "10px",
        backgroundColor: "#1c1c1c",
        height: "100%",
        width: "100%",
        objectFit: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user",
    };

    return (
        <>
            <Box style={{ paddingLeft: "200px" }} py={4} fontFamily={"Poppins"}>
                <Button
                    colorScheme={"teal"}
                    size="md"
                    onClick={() => setReadyToJoin(false)}
                >
                    Go Back
                </Button>
            </Box>
            <Flex
                minH={"70vh"}
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontFamily={"Poppins"}
            >
                <Stack spacing={4} mx={"auto"} w={"600px"}>
                    <Box w={"full"} h={"45vh"} position="relative">
                        {webcamOn ? (
                            <Webcam
                                ref={videoPlayerRef}
                                style={videoStyles}
                                audio={false}
                                videoConstraints={videoConstraints}
                            />
                        ) : (
                            <div style={videoStyles} />
                        )}

                        {!webcamOn ? (
                            <Box
                                position="absolute"
                                style={{
                                    top: 0,
                                    bottom: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    right: 0,
                                    left: 0,
                                }}
                            >
                                <Text color={"white"}>
                                    Camera is Turned Off
                                </Text>
                            </Box>
                        ) : null}
                        <Box
                            position="absolute"
                            bottom={"3"}
                            left="0"
                            right="0"
                        >
                            <Stack
                                spacing={4}
                                direction={"row"}
                                align={"center"}
                                justify={"center"}
                            >
                                <ActionIconBtn
                                    ActiveIcon={BsFillMicFill}
                                    InActiveIcon={BsFillMicMuteFill}
                                    isActive={micOn}
                                    onClick={toggleMic}
                                    activeText="Mute Mic"
                                    inActiveText={"Unmute Mic"}
                                />
                                <ActionIconBtn
                                    ActiveIcon={BsCameraVideoFill}
                                    InActiveIcon={BsCameraVideoOffFill}
                                    isActive={webcamOn}
                                    onClick={toggleWebcam}
                                    activeText="Turn Off Webcam"
                                    inActiveText={"Turn On Webcam"}
                                />
                            </Stack>
                        </Box>
                    </Box>
                    <FormControl id="name">
                        <FormLabel>Name</FormLabel>
                        <InputGroup>
                            <InputLeftElement>
                                <Icon as={BiUser} w={6} h={6} />
                            </InputLeftElement>
                            <Input
                                variant={"outline"}
                                color={"gray.500"}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <InputRightElement>
                                <Button
                                    disabled={name.length < 3}
                                    colorScheme="teal"
                                    size="sm"
                                    onClick={onClickStart}
                                >
                                    Start
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormHelperText fontSize={"sm"}>
                            Name you are going to use during the meeting
                        </FormHelperText>
                    </FormControl>
                </Stack>
            </Flex>
        </>
    );
};

const ActionIconBtn = ({
    ActiveIcon,
    InActiveIcon,
    isActive,
    onClick,
    activeText,
    inActiveText,
}) => (
    <Tooltip label={isActive ? activeText : inActiveText} placement={"top"}>
        <IconButton
            colorScheme={isActive ? "gray" : "red"}
            aria-label="Toggle Mic"
            icon={isActive ? <ActiveIcon /> : <InActiveIcon />}
            rounded={"full"}
            onClick={onClick}
        />
    </Tooltip>
);
