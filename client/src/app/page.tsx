"use client";

import { useState } from "react";
import Prompt from "@/components/Prompt";
import Header from "@/components/Header";
import Message from "@/components/Messages/Message";
import Search from "@/components/Search";
import TrainCard from "@/components/Card/route";

export default function Home() {
    const [fromCity, setFromCity] = useState<any>(null);
    const [toCity, setToCity] = useState<any>(null);
    const [multipleDates, setMultipleDates] = useState<boolean>(false);
    const [classType, setClassType] = useState<1 | 2>(2);

    const handleSearch = async () => {
        console.log("Searching...");
    };

    return (
        <div className="flex flex-col items-center justify-items-center min-h-screen p-4 gap-16 font-[family-name:var(--font-geist-sans)]">
            <Header />
            <main>
                <div className="flex flex-col gap-2 w-[90vw]">
                    <Search
                        fromCity={fromCity}
                        setFromCity={setFromCity}
                        toCity={toCity}
                        setToCity={setToCity}
                        multipleDates={multipleDates}
                        setMultipleDates={setMultipleDates}
                        classType={classType}
                        setClassType={setClassType}
                    />

                    <div className="mt-8">
                        <Prompt onSend={handleSearch} />
                        <Message text="Hello" />
                        <TrainCard />
                    </div>
                </div>
            </main>
        </div>
    );
}
