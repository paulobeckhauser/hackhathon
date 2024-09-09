import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/react";

export default function Prompt() {
    return (
        <div className="w-full h-full flex flex-col gap-2">
            <Textarea maxRows={5} placeholder="Prompt: "/>
            <Button className="text-white bg-indigo-500">Search</Button>
        </div>
    );
}
