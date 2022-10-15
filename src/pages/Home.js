import { Box, Text, HStack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { DateTime } from "luxon";
import { useState } from "react";
import HomeIconCard from "../components/common/HomeIconCard";
import { MdAddBox } from "react-icons/md";
import { BiBookAdd } from "react-icons/bi";
import { CgNotes } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [now, setNow] = useState(DateTime.local());
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
            <Navbar />
            <Box style={{ paddingLeft: "200px" }} py={4} fontFamily={"Poppins"}>
                <Text fontSize={"6xl"}>{getCurrentTime()}</Text>
                <Text fontSize={"lg"} mt={5}>
                    {getToday()}
                </Text>
                <HStack my={8} spacing={"20"}>
                    <HomeIconCard bgColor="orange.300" text={"New Meeting"} />
                    <HomeIconCard
                        IconName={MdAddBox}
                        text={"Join"}
                        onClick={() => navigate("/join-meeting")}
                    />
                    <HomeIconCard IconName={BiBookAdd} text={"Resources"} />
                    <HomeIconCard IconName={CgNotes} text={"Assignments"} />
                </HStack>
            </Box>
        </>
    );
};
export default Home;
