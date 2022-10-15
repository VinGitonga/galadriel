import { Flex, Box, chakra, Avatar, IconButton } from "@chakra-ui/react";
import { useRef, useEffect, useMemo } from "react";
import ReactPlayer from "react-player";
import { useParticipant } from "@videosdk.live/react-sdk";
import {
    BsFillMicFill,
    BsFillMicMuteFill,
    BsCameraVideoFill,
    BsCameraVideoOffFill,
} from "react-icons/bs";

export default function Participant({ participantId }) {

    const webcamRef = useRef(null);
    const micRef = useRef(null);

    const onStreamEnabled = (stream) => {};
    const onStreamDisabled = (stream) => {};

    const {
        displayName,
        webcamStream,
        micStream,
        micOn,
        isLocal,
        webcamOn,
    } = useParticipant(participantId, { onStreamDisabled, onStreamEnabled });

    const webcamMediaStream = useMemo(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [webcamStream, webcamOn]);

    useEffect(() => {
        if (micRef.current) {
            if (micOn && micStream) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(micStream.track);

                micRef.current.srcObject = mediaStream;
                micRef.current
                    .play()
                    .catch((err) => console.error("Mic Play() failed", err));
            } else {
                micRef.current.srcObject = null;
            }
        }
    }, [micStream, micOn]);


    return (
        <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            w={"130"}
            // mx="auto"
        >
            <audio ref={micRef} autoPlay muted={isLocal} />
            {webcamOn ? (
                <ReactPlayer
                    ref={webcamRef}
                    playsinline
                    pip={false}
                    light={false}
                    controls={false}
                    muted={true}
                    playing={true}
                    url={webcamMediaStream}
                    height={"224px"}
                    width={"100%"}
                    onError={(err) =>
                        console.log(err, "Participant Video error")
                    }
                />

            ) : (
                <>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        w={"full"}
                        h={56}
                        objectFit={"cover"}
                        backgroundColor={"#1c1c1c"}
                        rounded={"xl"}
                        shadow={"md"}
                    >
                        <Avatar
                            size="2xl"
                            name={displayName}
                            src={`https://avatars.dicebear.com/api/adventurer/${displayName?.toLowerCase()?.replaceAll(" ","")}.svg`}
                        />
                    </Box>
                </>
            )}
            <Box
                w={200}
                bg="white"
                _dark={{
                    bg: "gray.800",
                }}
                mt={-10}
                shadow="lg"
                rounded="lg"
                overflow="hidden"
            >
                <chakra.h3
                    py={2}
                    textAlign="center"
                    fontWeight="bold"
                    textTransform="uppercase"
                    color="gray.800"
                    _dark={{
                        color: "white",
                    }}
                    letterSpacing={1}
                >
                    {displayName} {isLocal && "(Me)"}
                </chakra.h3>

                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    py={2}
                    px={3}
                    bg="gray.200"
                    _dark={{
                        bg: "gray.700",
                    }}
                >
                    <ActionIconBtn
                        ActiveIcon={BsFillMicFill}
                        InActiveIcon={BsFillMicMuteFill}
                        isActive={micOn}
                    />
                    <ActionIconBtn
                        ActiveIcon={BsCameraVideoFill}
                        InActiveIcon={BsCameraVideoOffFill}
                        isActive={webcamOn}
                    />
                </Flex>
            </Box>
        </Flex>
    );
}

const ActionIconBtn = ({ ActiveIcon, InActiveIcon, isActive }) => (
    <IconButton
        colorScheme={isActive ? "gray" : "red"}
        aria-label="Toggle Mic"
        icon={isActive ? <ActiveIcon /> : <InActiveIcon />}
        rounded={"full"}
    />
);
