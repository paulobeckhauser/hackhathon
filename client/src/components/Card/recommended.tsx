import TrainCard from "./route";
import { Divider } from "antd";

interface TrainCardProps {
    route: any;
}

export default function Recommended({ route }: TrainCardProps) {
    return (
        <div className="">
            <h2 className="text-center text-xl">Recommended by Assistant: </h2>
            <TrainCard route={route} />
            <Divider className="w-full"/>
        </div>
    )
}
