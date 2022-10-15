import ReactPlayer from "react-player";
import { Box } from "@chakra-ui/react";

export default function Screenshare({ screenShareStream, screenRef }) {
    return (
        <Box h={"65vh"} w={"full"}>
            <ReactPlayer
                ref={screenRef}
                playsinline
                pip={false}
                light={false}
                controls={false}
                muted={true}
                playing={true}
                url={screenShareStream}
                height={"100%"}
                width={"100%"}
                onError={(err) => console.log(err, "Participant Video error")}
            />
        </Box>
    );
}
