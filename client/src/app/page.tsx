"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Message from "@/components/Messages/Message";
import Search from "@/components/Search";
import TrainCard from "@/components/Card/route";
import DBAPI from "@/api";

export default function Home() {
    const dbApi = new DBAPI();

    const [results, setResults] = useState<any>([]);

    return (
        <div className="flex flex-col items-center justify-items-center min-h-screen p-4 gap-16 font-[family-name:var(--font-geist-sans)]">
            <Header />
            <main className="flex flex-col gap-2 w-[90vw] max-w-[900px]">
                <Search results={results} setResults={setResults} />

                <div className="mt-4">
                    <Message text="Hello" />
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
