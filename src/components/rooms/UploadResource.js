import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Button,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    Text,
    useToast,
    Progress,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { RiUploadCloudLine } from "react-icons/ri";
import { addDoc, collection } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase";
import { useAuth } from "../../context/auth";

export default function UploadResource({ open, setOpen, roomId }) {
    const fileRef = useRef(null);
    const [fileName, setFileName] = useState(null);
    const [file, setFile] = useState();
    const toast = useToast();
    const { authUser } = useAuth();
    const [progressMsg, setProgressMsg] = useState(null);
    const [progressValue, setProgressValue] = useState(0);
    const [loading, setLoading] = useState(false);

    const pickImage = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            setFileName(e.target.files[0].name);
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setFile(readerEvent.target.result);
        };
    };

    const resetForm = () => {
        setFileName(null);
        setFile(null);
        setProgressMsg(null);
        setProgressValue(0);
        setLoading(false);
        setOpen(false);
    };

    function dataURItoBlob(dataURI) {
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0){
            byteString = atob(dataURI.split(',')[1]);
        }
        else{
            byteString = unescape(dataURI.split(',')[1]);
        }
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], {type:mimeString});
    }

    const clickSubmit = async () => {
        if (!file) {
            toast({
                title: "Select File to Upload",
                status: "error",
                isClosable: true,
                duration: 5000,
            });
            return;
        } else {
            setLoading(true);
            const fileRef = ref(storage, `rooms/${roomId}/resources`);
            const newFileBlob = dataURItoBlob(file)
            const uploadTask = uploadBytesResumable(fileRef, newFileBlob, "data_url")

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    let progress = Math.floor(
                        snapshot.bytesTransferred / snapshot.totalBytes
                    );
                    setProgressValue(progress);
                    switch (snapshot.state) {
                        case "paused":
                            setProgressMsg("Upload Paused");
                            break;
                        case "running":
                            setProgressMsg("Upload in progress 🚀");
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                    toast({
                        title: "Something went wrong during file upload",
                        status: "error",
                        isClosable: true,
                        duration: 5000,
                    });
                    setLoading(false);
                },
                () => {
                    setProgressMsg("Upload Complete 🎉");
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        async (downloadUrl) => {
                            await addDoc(collection(db, "resources"), {
                                addedByName: authUser?.name,
                                addedById: authUser?.id,
                                downloadUrl: downloadUrl,
                                roomId: roomId,
                                filename: fileName,
                            })
                                .catch((err) => {
                                    console.log(err);
                                    toast({
                                        title: "An error was encountered while saving details 😢",
                                        duration: 5000,
                                        isClosable: true,
                                        status: "error",
                                    });
                                })
                                .then(() => {
                                    toast({
                                        title: "File Upload and saved successfully 💃🚀",
                                        duration: 5000,
                                        isClosable: true,
                                        status: "success",
                                    });
                                    resetForm();
                                });
                        }
                    );
                    setLoading(false);
                }
            );
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
                        <FormLabel>Upload New Resource</FormLabel>
                        <Button
                            onClick={() => fileRef.current.click()}
                            leftIcon={<RiUploadCloudLine />}
                            colorScheme={"teal"}
                            variant={"solid"}
                        >
                            Select File
                        </Button>
                        <Input
                            hidden
                            type={"file"}
                            onChange={(e) => pickImage(e)}
                            ref={fileRef}
                        />
                        <Text fontSize={"sm"}>
                            {file ? fileName : "No file selected"}
                        </Text>
                        {loading ? (
                            <>
                                <Text fontSize={"sm"}>
                                    {progressMsg ? progressMsg : null}
                                </Text>
                                <Progress mt={2} value={progressValue} />
                            </>
                        ) : null}
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={clickSubmit} disabled={loading}>
                        Submit
                    </Button>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
