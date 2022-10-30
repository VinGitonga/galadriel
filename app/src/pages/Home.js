import { Box, Text, HStack } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useState } from "react";
import HomeIconCard from "../components/common/HomeIconCard";
import { MdAddBox, MdOutlineMeetingRoom } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";
import { TbArrowsJoin } from "react-icons/tb";
import NewRoom from "../components/rooms/NewRoom";
import JoinRoom from "../components/rooms/JoinRoom";
import { Helmet } from "react-helmet";

const Home = () => {
    const [now, setNow] = useState(DateTime.local());
    const [showModal, setShowModal] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const navigate = useNavigate();

    setInterval(() => setNow(DateTime.local()), 60000);

    const getCurrentTime = () => {
        return now.toLocaleString({ hour: "2-digit", minute: "2-digit" });
    };

    const getToday = () => {
        let f = { month: "long", day: "numeric", weekday: "long" };
        return now.setLocale("en-US").toLocaleString(f);
    };

    return (
        <>
        <Helmet>
            <title>TheRoom | Home</title>
        </Helmet>
            <NewRoom open={showModal} setOpen={setShowModal} />
            <JoinRoom open={showJoinModal} setOpen={setShowJoinModal} />
            <Box style={{ paddingLeft: "200px" }} py={4} fontFamily={"Poppins"}>
                <Text fontSize={"6xl"}>{getCurrentTime()}</Text>
                <Text fontSize={"lg"} mt={5}>
                    {getToday()}
                </Text>
                <HStack my={8} spacing={"20"}>
                    <HomeIconCard
                        IconName={MdAddBox}
                        text={"Join Meeting"}
                        onClick={() => navigate("/meeting-view")}
                    />
                    <HomeIconCard
                        IconName={FiEdit3}
                        text={"Create New Room"}
                        onClick={() => setShowModal(true)}
                    />
                    <HomeIconCard
                        IconName={TbArrowsJoin}
                        text={"Join Room"}
                        onClick={() => setShowJoinModal(true)}
                    />
                    <HomeIconCard
                        IconName={MdOutlineMeetingRoom}
                        text={"My Rooms"}
                        onClick={() => navigate("/my-rooms")}
                    />
                </HStack>
            </Box>
        </>
    );
};
export default Home;
