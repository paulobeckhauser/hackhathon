import { Button, Checkbox, DatePicker, DateRangePicker, TimeInput } from "@nextui-org/react";

import { useCallback, useEffect, useState } from "react";

import DBAPI from "@/api";
import { Divider, Select } from "antd";
import { debounce } from "@/utils/debounce";
import { Time } from "@internationalized/date";

import "./styles.css";
import Prompt from "../Prompt";
import { I18nProvider } from "@react-aria/i18n";

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

    const [userPrompt, setUserPrompt] = useState<string>("");

    const connections = results?.verbindungen?.length || 0;

    useEffect(() => {
        searchCities(search);
    }, [search]);

    useEffect(() => {
        searchCities("Einbeck");
    }, []);

    const handleSearch = async (prompt: string) => {
        setUserPrompt(prompt);
        setLoading(true);
        setResults([]);
        const date = new Date(dates.year, dates.month - 1, dates.day, time.hour, time.minute, time.second, time.millisecond);

        const formattedDate = date.toISOString().replace(/\.\d{3}Z$/, "");
        console.log(formattedDate)

        const formattedPrompt = prompt + `\nUser prefered time: ${formattedDate}`;
        const response = await dbApi.searchConnections(fromCity, toCity, formattedDate, formattedPrompt);
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
        const ignoredKeys = ["Shift", "Control", "Alt", "Meta", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
        let newValue = e.target.value;

        if (e.key === "Backspace") {
            newValue = newValue.slice(0, -1);
        } else if (!ignoredKeys.includes(e.key)) {
            newValue += e.key;
        }

        handleSearchChange(newValue);
    };

    return (
        <>
            <div onClick={() => setHidden(false)}>
                {hidden && (
                    <>
                        <div className=" bg-gray-200 p-6 rounded-2xl cursor-pointer">
                            <div className="flex">
                                <div className="">
                                    <h2 className="my-auto text-xl">Search the route</h2>
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
                            <Divider className="my-4" />
                            <div className="flex justify-between">
                                <small className="mt-auto">
                                    Found <span className="font-black">{connections}</span> connections
                                </small>

                                <div className="flex flex-col text-red-600 text-right">
                                    {results?.reliability &&
                                        results?.reliability?.map((e: any) => (
                                            <div className="flex gap-2 text-right ml-auto">
                                                <p>
                                                    {e.label}: <span className="font-black">{e.percent}%</span>
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-2 bg-gray-100 rounded-2xl p-4">
                            <span className="font-black">Your question:</span>
                            <br />
                            {userPrompt}
                        </div>
                    </>
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
                        <I18nProvider locale="en-GB">
                            {multipleDates ? (
                                <DateRangePicker label="Dates" className="w-full" onChange={(e) => setDates(e)} />
                            ) : (
                                <DatePicker label="Date" className="w-full" onChange={(e) => setDates(e)} />
                            )}
                            <TimeInput label="Time" className="w-1/2 sm:w-1/3" defaultValue={time} hourCycle={24} onChange={(e) => setTime(e)} />
                        </I18nProvider>
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
