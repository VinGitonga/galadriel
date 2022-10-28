import { MeetingProvider } from "@videosdk.live/react-sdk";
import MeetingView from "../components/meeting/MeetingView";
import { useLocation } from "react-router-dom";
import { getToken } from "../api";

export default function Meeting() {
    const location = useLocation();
    const state = location.state;
    return (
        <MeetingProvider
            config={{
                meetingId: state.meetingId,
                micEnabled: state.micOn,
                webcamEnabled: state.webcamOn,
                name: state.participantName
                    ? state.participantName
                    : "TestName",
            }}
            token={async () => await getToken()}
            reinitialiseMeetingOnConfigChange={true}
            joinWithoutUserInteraction={true}
        >
            <MeetingView meetingId={state.meetingId} />
        </MeetingProvider>
    );
}
