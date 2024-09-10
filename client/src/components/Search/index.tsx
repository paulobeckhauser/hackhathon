import { Button, Checkbox, DatePicker, DateRangePicker, TimeInput } from "@nextui-org/react";

import { useCallback, useEffect, useState } from "react";

import DBAPI from "@/api";
import { Select } from "antd";
import { debounce } from "@/utils/debounce";
import { Time } from "@internationalized/date";

import "./styles.css";
import Prompt from "../Prompt";

interface SearchProps {
    results: any;
    setResults: any;
    setLoading: any;
}

export default function Search({ results, setResults, setLoading }: SearchProps) {
    const dbApi = new DBAPI();

    const [fromCity, setFromCity] = useState<any>(null);
    const [toCity, setToCity] = useState<any>(null);
    const [dates, setDates] = useState<any>(null);
    const [time, setTime] = useState<any>(new Time(new Date().getHours(), new Date().getMinutes()));
    const [classType, setClassType] = useState<1 | 2>(2);

    const [cities, setCities] = useState<any[]>([]);
    const [multipleDates, setMultipleDates] = useState(false);
    const [search, setSearch] = useState<string>("");
    const [hidden, setHidden] = useState<boolean>(false);

    const connections = results
        ?.map((e: any) => {
            const o = JSON.parse(e).verbindungen;
            return o.length;
        })
        .reduce((acc: number, length: number) => acc + length, 0);

    useEffect(() => {
        searchCities(search);
    }, [search]);

    useEffect(() => {
        searchCities("Einbeck");
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        const date = new Date(dates.year, dates.month - 1, dates.day, time.hour, time.minute, time.second, time.millisecond);

        const formattedDate = date.toISOString().replace(/\.\d{3}Z$/, "");

        const response = await dbApi.searchConnections(fromCity, toCity, formattedDate);
        if (response.status != 200) {
            setLoading(false);
            return;
        }

        setResults(JSON.parse(response.data));
        setHidden(true);
        setLoading(false);
    };

    const handleSearchChange = useCallback(
        debounce((value: string) => {
            setSearch(value);
        }, 200),
        []
    );

    const searchCities = async (term: string) => {
        const response = await dbApi.getCity(term);
        if (response.status != 200) return;
        const parsedData = JSON.parse(response.data);

        const options = parsedData.map((city: any) => ({
            value: city.id,
            label: city.name,
        }));

        setCities(options);
    };

    const handleKeyDown = async (e: any) => {
        handleSearchChange(e.target.value + e.key);
    };

    return (
        <>
            <div onClick={() => setHidden(false)}>
                {hidden && (
                    <div className="flex cursor-pointer bg-gray-200 p-6 rounded-2xl">
                        <div className="">
                            <h2 className="my-auto text-xl">Search the route</h2>
                            <small>
                                Found <span className="font-black">{connections}</span> connections
                            </small>
                        </div>
                        <div className="ml-auto">
                            <p>
                                <span className="font-black">{fromCity.split("@")[1].substring(2)}</span>
                            </p>
                            <p>
                                <span className="font-black">{toCity.split("@")[1].substring(2)}</span>
                            </p>
                        </div>
                    </div>
                )}
                <div className={`flex flex-col gap-2`} style={{ display: hidden ? "none" : "flex" }}>
                    <Select showSearch onInputKeyDown={handleKeyDown} placeholder="From" style={{ height: "40px" }} onChange={(e) => setFromCity(e)}>
                        {cities.map(({ label, value, text }, index) => (
                            <Select.Option value={value} key={index}>
                                {label}
                            </Select.Option>
                        ))}
                    </Select>

                    <Select showSearch onInputKeyDown={handleKeyDown} placeholder="Destination" style={{ height: "40px" }} onChange={(e) => setToCity(e)}>
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
                    <div className="mt-8">
                        <Prompt onSend={handleSearch} />
                    </div>
                </div>
            </div>
        </>
    );
}
