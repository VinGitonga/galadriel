import { Box, Text, Flex } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useState, useEffect } from "react";
import HomeIconCard from "../components/common/HomeIconCard";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { query, where, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/auth";

const MyRooms = () => {
    const [now, setNow] = useState(DateTime.local());
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();
    const { authUser } = useAuth();

    setInterval(() => setNow(DateTime.local()), 60000);

    const getCurrentTime = () => {
        return now.toLocaleString({ hour: "2-digit", minute: "2-digit" });
    };

    const getToday = () => {
        let f = { month: "long", day: "numeric", weekday: "long" };
        return now.setLocale("en-US").toLocaleString(f);
    };

    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, "rooms"),
                    where("users", "array-contains", authUser?.id)
                ),
                (snapshot) =>
                    setRooms(
                        snapshot.docs.map((item) => ({
                            id: item.id,
                            ...item.data(),
                        }))
                    )
            ),
        [db, authUser]
    );

    return (
        <>
            <Box style={{ paddingLeft: "200px" }} py={4} fontFamily={"Poppins"}>
                <Text fontSize={"6xl"}>{"My Rooms"}</Text>
                <Text fontSize={"6xl"}>{getCurrentTime()}</Text>
                <Text fontSize={"lg"} mt={5}>
                    {getToday()}
                </Text>
                {rooms?.length > 0 ? (
                    <Flex align={"center"} my={8} flexWrap={"wrap"}>
                        {rooms.map((room) => (
                            <HomeIconCard
                                key={room?.id}
                                IconName={MdOutlineMeetingRoom}
                                text={room?.roomTitle}
                                onClick={() => navigate(`/room/${room?.id}`)}
                            />
                        ))}
                    </Flex>
                ) : (
                    <Text>You haven't joined any room</Text>
                )}
            </Box>
        </>
    );
};
export default MyRooms;
