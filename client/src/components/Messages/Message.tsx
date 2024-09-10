import Image from "next/image";

interface Message {
    text: string;
}

export default function Message({ text }: Message) {
    return (
        <div className="flex">
            <div className={`rounded-lg p-2 w-full bg-gray-100 py-6`}>
                <p className='text-center' dangerouslySetInnerHTML={{ __html: text }} />
            </div>
        </div>
    );
}
