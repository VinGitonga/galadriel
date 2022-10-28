import {
    Box,
    Text,
    HStack,
    Flex,
    TableContainer,
    Table,
    Thead,
    Tr,
    Tbody,
    Td,
    Th,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useState, useEffect } from "react";
import HomeIconCard from "../components/common/HomeIconCard";
import { MdAddBox, MdCloudDownload } from "react-icons/md";
import { BiBookAdd } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import ResourceItem from "../components/rooms/ResourceItem";
import {
    doc,
    getDoc,
    query,
    where,
    collection,
    onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import UploadResource from "../components/rooms/UploadResource";

const Room = () => {
    const [now, setNow] = useState(DateTime.local());
    const [roomDetails, setRoomDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [resources, setResources] = useState([]);
    const [meets, setMeets] = useState([]);
    const navigate = useNavigate();
    const params = useParams();

    const getRoomDetails = async () => {
        const roomRef = doc(db, "rooms", params?.roomId);
        const roomSnap = await getDoc(roomRef);
        setRoomDetails({ id: roomSnap.id, ...roomSnap.data() });
    };

    setInterval(() => setNow(DateTime.local()), 60000);

    const getCurrentTime = () => {
        return now.toLocaleString({ hour: "2-digit", minute: "2-digit" });
    };

    const getToday = () => {
        let f = { month: "long", day: "numeric", weekday: "long" };
        return now.setLocale("en-US").toLocaleString(f);
    };

    const getDateFromSchedule = (dateStr) => {
        let f = { month: "long", day: "numeric", weekday: "long" };
        let newDateStr;
        if (dateStr) {
            newDateStr = DateTime.fromISO(dateStr, { zone: "Africa/Nairobi" })
                .setLocale("en-US")
                .toLocaleString(f);
        } else {
            let dt = Date.now().toLocaleString();
            newDateStr = DateTime.fromISO(dt, { zone: "Africa/Nairobi" })
                .setLocale("en-US")
                .toLocaleString(f);
        }
        return newDateStr;
    };

    useEffect(() => {
        getRoomDetails();
    }, [params]);

    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, "meetings"),
                    where("meetingRoomId", "==", params?.roomId)
                ),
                (snapshot) =>
                    setMeets(
                        snapshot.docs.map((item) => ({
                            id: item.id,
                            ...item.data(),
                        }))
                    )
            ),
        [params, db]
    );

    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, "resources"),
                    where("roomId", "==", params?.roomId)
                ),
                (snapshot) =>
                    setResources(
                        snapshot.docs.map((item) => ({
                            id: item.id,
                            ...item.data(),
                        }))
                    )
            ),
        [params, db]
    );

    return (
        <>
            <UploadResource
                open={showModal}
                setOpen={setShowModal}
                roomId={params?.roomId}
            />
            <Box style={{ paddingLeft: "200px" }} py={4} fontFamily={"Poppins"}>
                <Flex align={"center"} flexWrap={"wrap"}>
                    <Text fontSize={"6xl"}>
                        {roomDetails?.roomTitle || "Room"} :
                    </Text>
                    <Text ml={"5"} fontSize={"lg"}>
                        Room Join Code {"->"} {roomDetails?.joinCode}
                    </Text>
                </Flex>
                <Text fontSize={"6xl"}>{getCurrentTime()}</Text>
                <Text fontSize={"lg"} mt={5}>
                    {getToday()}
                </Text>
                <HStack my={8} spacing={"20"}>
                    <HomeIconCard
                        bgColor="orange.300"
                        text={"New Meeting"}
                        onClick={() =>
                            navigate(`/new-meeting/${roomDetails?.id}`)
                        }
                    />
                    <HomeIconCard
                        IconName={MdAddBox}
                        text={"Join Meeting"}
                        onClick={() => navigate("/join-meeting")}
                    />
                    <HomeIconCard
                        IconName={MdCloudDownload}
                        text={"Add New Resource"}
                        onClick={() => setShowModal(true)}
                    />
                    <HomeIconCard
                        IconName={BiBookAdd}
                        text={"View All Resources"}
                    />
                </HStack>
                <Text fontSize={"4xl"} mb={"2"}>
                    Resources
                </Text>
                <Flex align={"center"} flexWrap={"wrap"}>
                    {resources.length > 0 ? (
                        resources.map((item) => (
                            <ResourceItem key={item.id} item={item} />
                        ))
                    ) : (
                        <Text>No new resources added 😒</Text>
                    )}
                </Flex>
                <Text fontSize={"4xl"} my={"2"}>
                    Meetings
                </Text>
                {meets.length > 0 ? (
                    <TableContainer>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Title</Th>
                                    <Th>Host</Th>
                                    <Th>Meeting ID</Th>
                                    <Th>Scheduled For</Th>
                                    <Th>Duration</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {meets.map((meet) => (
                                    <Tr key={meet?.id}>
                                        <Td>{meet?.meetingTitle}</Td>
                                        <Td>{meet?.meetingHost}</Td>
                                        <Td>{meet?.meetingId}</Td>
                                        <Td>
                                            {getDateFromSchedule(
                                                meet?.scheduledFor
                                            )}
                                        </Td>
                                        <Td>
                                            {meet?.duration} {" Minutes"}
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Text>No new meetings</Text>
                )}
            </Box>
        </>
    );
};
export default Room;
