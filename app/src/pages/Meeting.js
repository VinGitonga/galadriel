import { MeetingProvider } from "@videosdk.live/react-sdk";
import MeetingView from "../components/meeting/MeetingView";
import { useState } from "react";
import JoinMeeting from "../components/meeting/JoinMeeting";
import { Helmet } from "react-helmet";

export default function Meeting() {
    const [meetingId, setMeetingId] = useState("");
    const [micOn, setMicOn] = useState(false);
    const [webcamOn, setWebcamOn] = useState(false);
    const [token, setToken] = useState("");
    const [isMeetingStarted, setIsMeetingStarted] = useState(false);
    const [participantName, setParticipantName] = useState("");

    function onMeetLeaveAdd() {
        setToken("");
        setMeetingId("");
        setWebcamOn(false);
        setMicOn(false);
        setIsMeetingStarted(false);
    }

    return (
        <>
            <Helmet>
                <title>TheRoom | Meeting</title>
            </Helmet>
            {isMeetingStarted ? (
                <MeetingProvider
                    config={{
                        meetingId: meetingId,
                        micEnabled: micOn,
                        webcamEnabled: webcamOn,
                        name: participantName,
                    }}
                    token={token}
                    reinitialiseMeetingOnConfigChange={true}
                    joinWithoutUserInteraction={true}
                >
                    <MeetingView
                        meetingId={meetingId}
                        onMeetLeaveAdd={onMeetLeaveAdd}
                    />
                </MeetingProvider>
            ) : (
                <JoinMeeting
                    meetingId={meetingId}
                    setMeetingId={setMeetingId}
                    micOn={micOn}
                    setMicOn={setMicOn}
                    webcamOn={webcamOn}
                    setWebcamOn={setWebcamOn}
                    participantName={participantName}
                    setParticipantName={setParticipantName}
                    onClickStart={() => setIsMeetingStarted(true)}
                    setToken={setToken}
                />
            )}
        </>
    );
}
