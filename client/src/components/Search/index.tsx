import { Button, Checkbox, DatePicker, DateRangePicker, TimeInput } from "@nextui-org/react";

import { useEffect, useState } from "react";
import DBAPI from "@/api";
import { Select } from "antd";

import "./styles.css";

interface SearchProps {
    fromCity: any;
    setFromCity: any;
    toCity: any;
    setToCity: any;
    dates: any;
    setDates: any;
    time: any;
    setTime: any;
    classType: 1 | 2;
    setClassType: any;
}

export default function Search({ fromCity, setFromCity, toCity, setToCity, dates, setDates, time, setTime, classType, setClassType }: SearchProps) {
    const dbApi = new DBAPI();
    const [cities, setCities] = useState<any[]>([]);
    const [multipleDates, setMultipleDates] = useState(false);

    const searchFrom = async (e: any) => {
        const data = await dbApi.getCity(e.target.value + e.key);
        const parsedData = JSON.parse(data);

        const options = parsedData.map((city: any) => ({
            value: city.id,
            label: city.name,
        }));

        setCities(options);
    };

    useEffect(() => {
        const start = async () => {
            const data = await dbApi.getCity("a");
            const parsedData = JSON.parse(data);

            const options = parsedData.map((city: any) => ({
                value: city.id,
                label: city.name,
            }));

            setCities(options);
        };
        start();
    }, []);

    return (
        <>
            <Select showSearch onInputKeyDown={searchFrom} placeholder="From" style={{ height: "40px" }} onChange={(e) => setFromCity(e)}>
                {cities.map(({ label, value, text }, index) => (
                    <Select.Option value={value} key={index}>
                        {label}
                    </Select.Option>
                ))}
            </Select>

            <Select showSearch onInputKeyDown={searchFrom} placeholder="Destination" style={{ height: "40px" }} onChange={(e) => setToCity(e)}>
                {cities.map(({ label, value, text }, index) => (
                    <Select.Option value={value} key={index}>
                        {label}
                    </Select.Option>
                ))}
            </Select>

            <div className="flex gap-2 w-full">
                {multipleDates ? (
                    <DateRangePicker label="Dates" className="w-full" onChange={(e) => setDates(e)} />
                ) : (
                    <DatePicker label="Date" className="w-full" onChange={(e) => setDates(e)} />
                )}
                <TimeInput label="Time" className="w-1/2 sm:w-1/3" defaultValue={time} hourCycle={24} onChange={(e) => setTime(e)} />
            </div>

            <div className="flex gap-2">
                <Checkbox onChange={(e) => setMultipleDates(e.target.checked)}>Date range</Checkbox>
                <div className="flex gap-2 ml-auto">
                    <Button className={classType == 1 ? "bg-indigo-500 text-white" : ""} size="sm" onClick={() => setClassType(1)}>
                        1st class
                    </Button>
                    <Button className={classType == 2 ? "bg-indigo-500 text-white" : ""} size="sm" onClick={() => setClassType(2)}>
                        2nd class
                    </Button>
                </div>
            </div>
        </>
    );
}
