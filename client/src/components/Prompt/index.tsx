import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function Prompt({ onSend }: { onSend: (text: string) => void }) {
    const [text, setText] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSend(text);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as unknown as React.FormEvent);
        }
    };

    return (
        <form
            className="w-full h-full flex flex-col gap-2"
            onSubmit={handleSubmit}
        >
            <Textarea
                maxRows={5}
                placeholder="Prompt: "
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                value={text}
            />
            <Button
                className={`text-white bg-indigo-500`}
                type="submit"
            >
                Search
            </Button>
        </form>
    );
}
