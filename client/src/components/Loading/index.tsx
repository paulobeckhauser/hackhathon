import { AiOutlineLoading } from "react-icons/ai";

export default function Loading(){
    return (
        <div className="flex justify-center items-center">
            <AiOutlineLoading className="animate-spin text-4xl text-blue-500 text-2xl" />
        </div>
    )
}