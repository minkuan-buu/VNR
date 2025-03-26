"use client";
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
import { Input } from "@heroui/input";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export interface ChatModel {
    author: string;
    message: string;
}

export default function AIButton() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [response, setResponse] = useState<ChatModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChat = async (message: string) => {
        if (!message) return;
        setIsLoading(true);
        setMessage("");

        // Lưu tin nhắn user
        setResponse((prev) => [...prev, { author: "user", message }]);

        // Hiển thị hiệu ứng AI đang suy nghĩ
        setResponse((prev) => [...prev, { author: "ai", message: "..." }]);

        var prompt = `Hãy trả lời câu hỏi liên quan đến Đảng lãnh đạo cả nước quá độ lên chủ nghĩa xã hội và tiến hành công cuộc đổi mới hoặc những câu hỏi liên quan trong môn học lịch sử Đảng. Nếu không liên quan, trả lời 'Xin lỗi, tôi không thể trả lời câu hỏi không liên quan'. Câu hỏi: ${message}`;

        try {
            const res = await fetch("https://vnr.buubuu.id.vn/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: prompt }),
            });

            const data = await res.json();

            // Cập nhật tin nhắn AI (xóa "..." và thay bằng nội dung thực)
            setResponse((prev) => [
                ...prev.slice(0, -1), // Xóa phần "..."
                { author: "ai", message: data.message }
            ]);
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }

        setIsLoading(false);
        setMessage(""); // Xóa input sau khi gửi
    };

    return (
        <div className="fixed bottom-5 right-5">
            <Modal isOpen={isOpen} placement="bottom" onOpenChange={onOpenChange}>
                <ModalContent className="fixed bottom-5 right-5 w-[450px] h-[600px] shadow-lg border rounded-lg flex flex-col">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">AI Chat</ModalHeader>
                            <ModalBody className="flex flex-col gap-2 items-start overflow-y-auto">
                                <p>Chào bạn! Tôi là AI Chatbot. Bạn cần giúp gì?</p>
                                {response.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`max-w-[80%] p-2 rounded-lg 
                                            ${item.author === "user"
                                                ? "bg-blue-500 text-white self-end"
                                                : "bg-gray-200 text-black self-start"
                                            }`}
                                    >
                                        {item.message === "..." && item.author != "user" ? (
                                            <span className="animate-pulse">🤖 Đang suy nghĩ...</span>
                                        ) : (
                                            <ReactMarkdown>
                                                {item.message}
                                            </ReactMarkdown>
                                        )}
                                    </div>
                                ))}
                            </ModalBody>
                            <ModalFooter className="flex gap-2 items-center justify-between">
                                <Input
                                    disabled={isLoading}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full"
                                    placeholder="Nhập câu hỏi..."
                                />
                                <Button
                                    className="mt-2"
                                    disabled={isLoading}
                                    onPress={() => handleChat(message)}
                                >
                                    Gửi
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Button
                className="bg-blue-500 text-white w-20 h-20 text-sm rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300"
                onPress={onOpen}
            >
                <MdSmartToy size={28} />
            </Button>
        </div>
    );
}
