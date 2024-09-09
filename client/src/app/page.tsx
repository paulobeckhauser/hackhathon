"use client";

import { useState } from "react";
import { Time } from "@internationalized/date";
import Prompt from "@/components/Prompt";
import Header from "@/components/Header";
import Message from "@/components/Messages/Message";
import Search from "@/components/Search";
import TrainCard from "@/components/Card/route";
import DBAPI from "@/api";

export default function Home() {
    const dbApi = new DBAPI();

    const [results, setResults] = useState<any>([]);

    const [fromCity, setFromCity] = useState<any>(null);
    const [toCity, setToCity] = useState<any>(null);
    const [dates, setDates] = useState<any>(null);
    const [time, setTime] = useState<any>(new Time(new Date().getHours(), new Date().getMinutes()));
    const [classType, setClassType] = useState<1 | 2>(2);

    const handleSearch = async () => {
        const date = new Date(dates.year, dates.month - 1, dates.day, time.hour, time.minute, time.second, time.millisecond);

        const formattedDate = date.toISOString().replace(/\.\d{3}Z$/, "");

        const data = await dbApi.searchConnections(fromCity, toCity, formattedDate);
        setResults(data.verbindungen);
    };

    return (
        <div className="flex flex-col items-center justify-items-center min-h-screen p-4 gap-16 font-[family-name:var(--font-geist-sans)]">
            <Header />
            <main className="flex flex-col gap-2 w-[90vw] max-w-[900px]">
                <Search
                    fromCity={fromCity}
                    setFromCity={setFromCity}
                    toCity={toCity}
                    setToCity={setToCity}
                    dates={dates}
                    setDates={setDates}
                    time={time}
                    setTime={setTime}
                    classType={classType}
                    setClassType={setClassType}
                />

                <div className="mt-8">
                    <Prompt onSend={handleSearch} />
                    {/* <Message text="Hello" /> */}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 my-6">
                    {results?.map((e: any) => {
                        return <TrainCard route={e} />;
                    })}
                </div>
            </main>
        </div>
    );
}
