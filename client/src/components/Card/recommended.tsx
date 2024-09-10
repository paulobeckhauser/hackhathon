import DBAPI from "@/api";
import { Card, Button } from "@nextui-org/react";
import Link from "next/link";
import { FaWalking } from "react-icons/fa";
import TrainCard from "./route";

interface TrainCardProps {
    route: any;
}

export default function Recommended({ route }: TrainCardProps) {
    return (
        <div className="">
            <h2>Recommended by Assistant: </h2>
            <TrainCard route={route} />
        </div>
    )
}
