import { Box, Text, HStack, Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { DateTime } from "luxon";
import { useState, useEffect } from "react";
import HomeIconCard from "../components/common/HomeIconCard";
import { MdAddBox, MdCloudDownload } from "react-icons/md";
import { BiBookAdd } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import ResourceItem from "../components/rooms/ResourceItem";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import UploadResource from "../components/rooms/UploadResource";

const Room = () => {
    const [now, setNow] = useState(DateTime.local());
    const [roomDetails, setRoomDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
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

    useEffect(() => {
        getRoomDetails();
    }, [params]);

    return (
        <>
            <Navbar />
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
                        {roomDetails?.joinCode}
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
                        onClick={() => navigate("/new-meeting")}
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
                    {[...Array(8)].map((_, i) => (
                        <ResourceItem key={i} />
                    ))}
                </Flex>
            </Box>
        </>
    );
};
export default Room;
