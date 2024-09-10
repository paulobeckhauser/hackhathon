import { Divider } from "antd";

export default function Header(){
    return (
        <div>
            <Divider className="my-2" />
            <h1 className="text-2xl font-light tracking-wide">BahnBuddy</h1>
            <Divider className="my-2" />
        </div>
    )
}