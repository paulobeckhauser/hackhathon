import Image from "next/image";
import { FaDotCircle } from "react-icons/fa";

interface Message {
    message: string;
    date: string;
    side: "left" | "right";
}

export default function Message({ message, date, side }: Message) {

    const color = side == "right" ? "bg-green-500" : "bg-gray-700";

    return (
        <div className="my-2 mr-auto flex">
            <div
                className={`bg-opacity-80 rounded-lg shadow-2xl p-2 ${
                    side == "right" && "ml-auto"
                } ${color}`}
            >
                <p dangerouslySetInnerHTML={{ __html: message }} />
            </div>
        </div>
    );
}
