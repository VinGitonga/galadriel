import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    VStack,
    Flex,
    Text,
    useToast,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { CopyToClipboard } from "react-copy-to-clipboard";

function formatDate(dateString = "2012") {
    let dateObj = new Date(dateString);
    let dateISO = dateObj.toISOString();
    let formattedDate = DateTime.fromISO(dateISO, { zone: "Africa/Nairobi" })
        .setLocale("en-US")
        .toFormat("fff");
    return formattedDate;
}

export default function MeetingCreatedDetails({ content, open, setOpen, copyText }) {
    
    const toast = useToast()


    const onCopy = () => {
        toast({
            title:"Meeting Details Copied Successfully",
            status:"success",
            duration: 3000,
            isClosable: true
        })
    }

    return (
        <Modal closeOnOverlayClick={false} isOpen={open} onClose={setOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Meeting Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <VStack spacing={4}>
                        <Item
                            title={"Meeting Title"}
                            text={content?.meetingTitle}
                        />
                        <Item title={"Host"} text={content?.meetingHost} />
                        <Item title={"Meeting ID"} text={content?.meetingId} />
                        <Item
                            title={"Meeting Passcode"}
                            text={content?.meetingPasscode}
                        />
                        <Item
                            title={"Scheduled For"}
                            text={formatDate(content?.scheduledFor)}
                        />
                        <Item title={"Room Title"} text={content?.roomTitle} />
                        <Item
                            title={"Meeting Duration"}
                            text={`${content?.duration} minutes`}
                        />
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <CopyToClipboard
                        text={copyText}
                        onCopy={onCopy}
                    >
                        <Button colorScheme="blue" mr={3}>
                            {"Copy Details"}
                        </Button>
                    </CopyToClipboard>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

const Item = ({ title, text }) => (
    <Flex align={"center"}>
        <Text mr={"2"} fontSize={"xl"} color={"gray.700"}>
            {title} :
        </Text>
        <Text>{text}</Text>
    </Flex>
);
