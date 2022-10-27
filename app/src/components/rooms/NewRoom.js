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
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

export default function NewRoom({ open, setOpen }) {
    const [roomTitle, setRoomTitle] = useState("");
    const toast = useToast();
    const navigate = useNavigate();
    const { authUser } = useAuth();

    const customToast = ({ title, status }) => {
        return toast({
            title,
            status,
            duration: 5000,
            isClosable: true,
        });
    };

    const sanitizedForm = () => {
        return {
            roomTitle,
            creatorId: authUser?.id,
            creatorName: authUser?.name,
            joinCode: nanoid(8),
            users: [authUser?.id]
        };
    };

    const clickSubmit = async () => {
        if (!roomTitle) {
            customToast({ title: "Enter Room Title", status: "error" });
            return;
        } else {
            const docRef = await addDoc(
                collection(db, "rooms"),
                sanitizedForm()
            ).catch(() => {
                customToast({ title: "Something Went wrong", status: "error" });
            });
            customToast({
                title: "Room Created Successfully",
                status: "success",
            });
            setOpen(false);
            navigate(`/room/${docRef.id}`);
        }
    };
    return (
        <Modal isOpen={open} onClose={setOpen} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>New Room</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Room Title</FormLabel>
                        <Input
                            value={roomTitle}
                            onChange={(e) => setRoomTitle(e.target.value)}
                            placeholder="Probs & Stats Room"
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
