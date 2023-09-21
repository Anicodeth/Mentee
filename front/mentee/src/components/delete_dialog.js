import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton, Button, useDisclosure,
} from '@chakra-ui/react'
import {useRef, useState} from "react";
import {deleteClass} from "../services/classesService";
import SideMessage from "./side_message";
import {SecondaryButton} from "./buttons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

export default function PromptDialog(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef(null)
    const [isLoading,setIsLoading] = useState(false)
    const [isError,setIsError] = useState(false)
    const [isSuccess,setIsSuccess] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")


    const deleteCourse = async (lectureId)=>{
        setIsLoading(true);
        setIsError(false);
        setIsSuccess(false);
        deleteClass(lectureId).then(data=>{
            setIsLoading(false);
            setIsError(false);
            setIsSuccess(true);
            setTimeout(()=>{
                window.location.reload();
            },600)
            // onClose();
        }).catch(e=>{
            setIsLoading(false);
            setIsError(true);
            setIsSuccess(false);
            setErrorMessage(e.message.toString);
        });
    }

    return (
        <>
            <button onClick={(e)=>{
                e.stopPropagation();
                onOpen();
            }} className="mr-3 bg-red-600 transition delay-50 text-lg text-white px-3 py-1 font-semibold rounded">{props.title}</button>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>{props.title}?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        {props.description}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            No
                        </Button>
                    <Button className="w-16" colorScheme='red' ml={3} onClick={async ()=>{
                        await props.onPressFunction(props.lectureId);
                    }}>
                        {isLoading?<FontAwesomeIcon icon={faSpinner}/>:"Yes"}
                    </Button>
                        {isError ? (
                            <SideMessage message={errorMessage}/>
                        ) : null}
                        {isSuccess ? (
                            <SideMessage message={"Lecture successfully deleted!"} isError={false}/>
                        ) : null}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}