import {
    Button,
    Checkbox,
    DatePicker,
    DateRangePicker,
    TimeInput,
} from "@nextui-org/react";
import { Time } from "@internationalized/date";
import Select from "react-select";

import { useState } from "react";
import DBAPI from "@/api";

interface SearchProps {
    fromCity: any;
    setFromCity: any;
    toCity: any;
    setToCity: any;
    multipleDates: boolean;
    setMultipleDates: any;
    classType: 1 | 2;
    setClassType: any;
}

const dbApi = new DBAPI();

export default function Search({
    fromCity,
    setFromCity,
    toCity,
    setToCity,
    multipleDates,
    setMultipleDates,
    classType,
    setClassType,
}: SearchProps) {
    const [cities, setCities] = useState([]);

    const cityFrom = async (e: any) => {
        const city = e.target.value;

        if (city.length > 2) {
            const data = await dbApi.getCity(city);
            setCities(data);
        }
    };

    return (
        <>
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
                onChange={(e) => setFromCity(e)}
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
                onChange={(e) => setToCity(e)}
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
                <Checkbox onChange={(e) => setMultipleDates(e.target.checked)}>
                    Date range
                </Checkbox>
                <div className="flex gap-2 ml-auto">
                    <Button
                        className={
                            classType == 1 ? "bg-indigo-500 text-white" : ""
                        }
                        size="sm"
                        onClick={() => setClassType(1)}
                    >
                        1st class
                    </Button>
                    <Button
                        className={
                            classType == 2 ? "bg-indigo-500 text-white" : ""
                        }
                        size="sm"
                        onClick={() => setClassType(2)}
                    >
                        2nd class
                    </Button>
                </div>
            </div>
        </>
    );
}
