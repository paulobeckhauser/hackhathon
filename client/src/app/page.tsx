"use client";

import DBAPI from "@/api";
import {
    Button,
    Checkbox,
    DatePicker,
    DateRangePicker,
    Input,
    Tab,
    Tabs,
    TimeInput,
} from "@nextui-org/react";
import { useState } from "react";
import { CiCircleChevDown, CiLocationOn } from "react-icons/ci";
import { Time } from "@internationalized/date";

import Select from "react-select";
import Prompt from "@/components/Prompt";
import Header from "@/components/Header";

const dbApi = new DBAPI();

const options = [
    { value: "Wolfsburg", label: "Wolfsburg" },
    { value: "Berlin", label: "Berlin" },
    { value: "Hamburg", label: "Hamburg" },
    { value: "Munich", label: "Munich" },
    { value: "Cologne", label: "Cologne" },
    { value: "Frankfurt", label: "Frankfurt" },
    { value: "Stuttgart", label: "Stuttgart" },
    { value: "Düsseldorf", label: "Düsseldorf" },
    { value: "Dortmund", label: "Dortmund" },
    { value: "Essen", label: "Essen" },
    { value: "Leipzig", label: "Leipzig" },
    { value: "Bremen", label: "Bremen" },
    { value: "Dresden", label: "Dresden" },
    { value: "Hanover", label: "Hanover" },
    { value: "Nuremberg", label: "Nuremberg" },
    { value: "Duisburg", label: "Duisburg" },
    { value: "Bochum", label: "Bochum" },
    { value: "Wuppertal", label: "Wuppertal" },
    { value: "Bielefeld", label: "Bielefeld" },
    { value: "Bonn", label: "Bonn" },
    { value: "Münster", label: "Münster" },
    { value: "Karlsruhe", label: "Karlsruhe" },
    { value: "Mannheim", label: "Mannheim" },
    { value: "Augsburg", label: "Augsburg" },
    { value: "Wiesbaden", label: "Wiesbaden" },
    { value: "Gelsenkirchen", label: "Gelsenkirchen" },
    { value: "Mönchengladbach", label: "Mönchengladbach" },
    { value: "Braunschweig", label: "Braunschweig" },
    { value: "Chemnitz", label: "Chemnitz" },
    { value: "Kiel", label: "Kiel" },
    { value: "Aachen", label: "Aachen" },
];

export default function Home() {
    const [cities, setCities] = useState(options);

    const [fromCity, setFromCity] = useState<any>(null);
    const [toCity, setToCity] = useState<any>(null);

    const [multipleDates, setMultipleDates] = useState<boolean>(false);
    const [classType, setClassType] = useState<1 | 2>(2);

    const cityFrom = async (e: any) => {
        const city = e.target.value;

        if (city.length > 2) {
            const data = await dbApi.getCity(city);
            setCities(data);
        }
    };

    return (
        <div className="flex flex-col items-center justify-items-center min-h-screen p-4 gap-16 font-[family-name:var(--font-geist-sans)]">
            <Header />
            <main>
                <div className="flex flex-col gap-2 w-[90vw]">
                    <Select
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                backgroundColor: "#f4f4f5",
                                border: "none",
                                borderRadius: "12px",
                                height: "40px",
                            }),
                        }}
                        classNamePrefix="select"
                        placeholder="From"
                        name="from"
                        options={cities.filter((city) => city.value != toCity?.value)}
                        onChange={((e) => setFromCity(e))}
                    />

                    <Select
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                backgroundColor: "#f4f4f5",
                                border: "none",
                                borderRadius: "12px",
                                height: "40px",
                            }),
                        }}
                        classNamePrefix="select"
                        placeholder="Destinaton"
                        name="destination"
                        options={cities.filter((city) => city.value != fromCity?.value)}
                        onChange={((e) => setToCity(e))}
                    />

                    <div className="flex gap-2 w-full">
                        {multipleDates ? (
                            <DateRangePicker label="Dates" className="w-full" />
                        ) : (
                            <DatePicker label="Date" className="w-full" />
                        )}
                        <TimeInput
                            label="Time"
                            className="w-1/2 sm:w-1/3"
                            defaultValue={new Time(11, 45)}
                            hourCycle={24}
                        />
                    </div>

                    <div className="flex gap-2">
                        <Checkbox
                            onChange={(e) => setMultipleDates(e.target.checked)}
                        >
                            Date range
                        </Checkbox>
                        <div className="flex gap-2 ml-auto">
                            <Button
                                className={classType == 1 ? "bg-indigo-500 text-white" : ""}
                                size="sm"
                                onClick={() => setClassType(1)}
                            >
                                1st class
                            </Button>
                            <Button
                                className={classType == 2 ? "bg-indigo-500 text-white" : ""}
                                size="sm"
                                onClick={() => setClassType(2)}
                            >
                                2nd class
                            </Button>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Prompt />
                    </div>

                    {cities.map((city: any) => (
                        <div key={city.id}>{city.name}</div>
                    ))}
                </div>
            </main>
        </div>
    );
}
