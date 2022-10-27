import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    ModalFooter,
    Button,
    Input,
    FormLabel,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import {
    getDocs,
    collection,
    where,
    query,
    doc,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

export default function JoinRoom({ open, setOpen }) {
    const [joinCode, setJoinCode] = useState("");
    const toast = useToast();
    const navigate = useNavigate()
    const { authUser } = useAuth();

    const customToast = ({ title, status }) => {
        return toast({
            title,
            status,
            duration: 5000,
            isClosable: true,
        });
    };

    const validateCode = async () => {
        const q = query(
            collection(db, "rooms"),
            where("joinCode", "==", joinCode)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty()) {
            return false;
        } else {
            return true;
        }
    };

    const confirmUserJoinStatus = async () => {
        const q = query(
            collection(db, "rooms"),
            where("joinCode", "==", joinCode)
        );
        const querySnapshot = await getDocs(q);
        let allRooms = [];
        querySnapshot.forEach((doc) => {
            let roomInfo = {
                id: doc.id,
                ...doc.data(),
            };
            allRooms.push(roomInfo);
        });
        let room = allRooms[0];
        let users = room?.users;
        let status = users?.includes(authUser?.id);
        let roomId = room?.id;
        return { status, roomId };
    };

    const clickSubmit = async () => {
        if (!joinCode) {
            customToast({ title: "Enter Room Join Code", status: "error" });
            return;
        } else {
            if (validateCode()) {
                let { roomId, status } = await confirmUserJoinStatus();
                if (!status) {
                    const roomRef = doc(db, "rooms", roomId);
                    await updateDoc(roomRef, {
                        users: arrayUnion(authUser?.id),
                    });
                    customToast({
                        title: "You've been successfully added to the Room",
                        status: "success",
                    });
                    navigate(`/room/${roomId}`)
                } else {
                    customToast({
                        title: "You are already added to the Room",
                        status: "warning",
                    });
                    return
                }
            } else {
                customToast({ title: "Invalid Join Code", status: "error" });
                return;
            }
        }
    };
    return (
        <Modal isOpen={open} onClose={setOpen} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Join Room</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Join Code</FormLabel>
                        <Input
                            value={joinCode}
                            onChange={(e) => setJoinCode(e.target.value)}
                            placeholder="Kjiu_jki"
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={clickSubmit}>
                        Submit
                    </Button>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
