import TrainCard from "./route";
import { Divider } from "antd";

interface TrainCardProps {
    route: any;
}

export default function Recommended({ route }: TrainCardProps) {
    return (
        <div className="my-4">
            <TrainCard route={route} recommended={true} />
        </div>
    )
}
