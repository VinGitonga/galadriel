import {
    Box,
    SimpleGrid,
    GridItem,
    Tabs,
    TabList,
    Tab,
    TabPanel,
    TabPanels,
    HStack,
    Tooltip,
    IconButton,
    useToast,
} from "@chakra-ui/react";
import Chats from "../chats";
import { ImPhoneHangUp } from "react-icons/im";
import Navbar from "../Navbar";
import Card from "../common/Card";
import MeetingParticipant from "../participants";
import ActionsCard from "../common/ActionsCard";
import ParticipantsView from "./ParticipantsView";
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import { useMemo, useRef } from "react";
import Screenshare from "./Screenshare";
import { chunk } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const MeetingView = () => {
    const screenShareRef = useRef(null);
    const navigate = useNavigate()
    const toast = useToast()

    function onMeetingLeave() {
        toast({
            title:"You have left a meeting",
            status: "info",
            isClosable: true,
            duration: 5000
        })
        navigate('/home')
    }

    function onParticipantJoined(participant) {
        console.log(" onParticipantJoined", participant);
    }
    function onParticipantLeft(participant) {
        console.log(" onParticipantLeft", participant);
    }
    const onSpeakerChanged = (activeSpeakerId) => {
        console.log(" onSpeakerChanged", activeSpeakerId);
    };
    function onPresenterChanged(presenterId) {
        console.log(" onPresenterChanged", presenterId);
    }
    function onMainParticipantChanged(participant) {
        console.log(" onMainParticipantChanged", participant);
    }
    function onEntryRequested(participantId, name) {
        console.log(" onEntryRequested", participantId, name);
    }
    function onEntryResponded(participantId, name) {
        console.log(" onEntryResponded", participantId, name);
    }
    function onRecordingStarted() {
        console.log(" onRecordingStarted");
    }
    function onRecordingStopped() {
        console.log(" onRecordingStopped");
    }
    function onChatMessage(data) {
        console.log(" onChatMessage", data);
    }
    function onMeetingJoined() {
        console.log("onMeetingJoined");
    }
    function onMeetingLeft() {
        console.log("onMeetingLeft");
        onMeetingLeave();
    }
    const onLiveStreamStarted = (data) => {
        console.log("onLiveStreamStarted example", data);
    };
    const onLiveStreamStopped = (data) => {
        console.log("onLiveStreamStopped example", data);
    };

    const onVideoStateChanged = (data) => {
        console.log("onVideoStateChanged", data);
    };
    const onVideoSeeked = (data) => {
        console.log("onVideoSeeked", data);
    };

    const onWebcamRequested = (data) => {
        console.log("onWebcamRequested", data);
    };
    const onMicRequested = (data) => {
        console.log("onMicRequested", data);
    };
    const onPinStateChanged = (data) => {
        console.log("onPinStateChanged", data);
    };
    const onSwitchMeeting = (data) => {};

    const onConnectionOpen = (data) => {
        console.log("onConnectionOpen", data);
    };

    const {
        meetingId,
        meeting,
        localParticipant,
        mainParticipant,
        activeSpeakerId,
        participants,
        presenterId,
        localMicOn,
        localWebcamOn,
        localScreenShareOn,
        isRecording,
        isLiveStreaming,
        pinnedParticipants,
        //
        join,
        leave,
        connectTo,
        end,
        //
        startRecording,
        stopRecording,
        toggleMic,
        toggleWebcam,
        toggleScreenShare,
    } = useMeeting({
        onParticipantJoined,
        onParticipantLeft,
        onSpeakerChanged,
        onPresenterChanged,
        onMainParticipantChanged,
        onEntryRequested,
        onEntryResponded,
        onRecordingStarted,
        onRecordingStopped,
        onChatMessage,
        onMeetingJoined,
        onMeetingLeft,
        onLiveStreamStarted,
        onLiveStreamStopped,
        onVideoStateChanged,
        onVideoSeeked,
        onWebcamRequested,
        onMicRequested,
        onPinStateChanged,
        onSwitchMeeting,
        onConnectionOpen,
    });

    
    

    const { screenShareStream, screenShareOn } = useParticipant(presenterId);

    const screenShareMediaStream = useMemo(() => {
        if (screenShareOn) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(screenShareStream.track);
            return mediaStream;
        }
    }, [screenShareStream, screenShareOn]);

    return (
        <>
            <Navbar />
            <Box px={4} py={4} mx="auto" fontFamily={"Poppins"}>
                <SimpleGrid
                    w={{ base: "full", xl: 11 / 12 }}
                    columns={{ base: 1, lg: 11 }}
                    gap={{ base: 0, lg: 8 }}
                    mx="auto"
                >
                    <GridItem colSpan={{ base: "auto", md: 7 }}>
                        {screenShareOn ? (
                            <Screenshare
                                screenShareStream={screenShareMediaStream}
                                screenRef={screenShareRef}
                            />
                        ) : (
                            <ParticipantsView />
                        )}
                        <HStack my={5} spacing={6} align={"center"} mx={4}>
                            <ActionsCard
                                onToggleMute={toggleMic}
                                onToggleWebcam={toggleWebcam}
                                onToggleScreenShare={toggleScreenShare}
                                micOn={localMicOn}
                                webcamOn={localWebcamOn}
                            />

                            <Tooltip label={"Leave Meeting"} placement={"top"}>
                                <IconButton
                                    colorScheme={"red"}
                                    rounded={"full"}
                                    icon={<ImPhoneHangUp />}
                                    size={"md"}
                                    onClick={leave}
                                />
                            </Tooltip>
                        </HStack>
                    </GridItem>
                    <GridItem colSpan={{ base: "auto", lg: 4 }}>
                        <Card>
                            <Tabs isFitted variant="enclosed">
                                <TabList mb="1em">
                                    <Tab>Chats</Tab>
                                    <Tab>Participants</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <Chats />
                                    </TabPanel>
                                    <TabPanel>
                                        <Box
                                            maxH={"70vh"}
                                            h={"full"}
                                            w={"full"}
                                            padding={"24px"}
                                            overflowY={"scroll"}
                                        >
                                            {chunk([
                                                ...participants.keys(),
                                            ]).map((k) => (
                                                <div>
                                                    {k.map((l) => (
                                                        <MeetingParticipant
                                                            key={l}
                                                            participantId={l}
                                                        />
                                                    ))}
                                                </div>
                                            ))}
                                        </Box>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Card>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </>
    );
};

export default MeetingView;
