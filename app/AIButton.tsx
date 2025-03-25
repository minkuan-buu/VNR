"use client"; // Bắt buộc để dùng event handler

import { MdSmartToy } from "react-icons/md";
import { Button } from "@heroui/button";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure
} from "@heroui/modal";

export default function AIButton() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className="fixed bottom-5 right-5">
            {/* Modal tùy chỉnh vị trí */}
            <Modal isOpen={isOpen} placement="bottom" onOpenChange={onOpenChange}>
                <ModalContent
                    className="fixed bottom-5 right-5 w-[350px] shadow-lg border rounded-lg"
                >
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">AI Chat</ModalHeader>
                            <ModalBody>
                                <p>Chào bạn! Tôi là AI Chatbot. Bạn cần giúp gì?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Đóng
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Bắt đầu
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* Nút mở modal */}
            <Button
                className="bg-blue-500 text-white w-20 h-20 text-sm rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300"
                onPress={onOpen}
            >
                <MdSmartToy size={28} />
            </Button>
        </div>
    );
}
