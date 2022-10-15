import { useMeeting } from "@videosdk.live/react-sdk"
import Participant from "./Participant"
import { chunk } from "../../utils/utils";
import { SimpleGrid } from "@chakra-ui/react";


export default function ParticipantsView() {
    const { participants } = useMeeting();
    return (
        <SimpleGrid columns={[1, null, 2]} spacing={"10"}>
            {chunk([...participants.keys()]).map((k) => (
                <div>
                    {k.map((l) => (
                        <Participant key={l} participantId={l} />
                    ))}
                </div>
            ))}
        </SimpleGrid>
    )
}
