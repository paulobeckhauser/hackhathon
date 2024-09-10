"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Message from "@/components/Messages/Message";
import Search from "@/components/Search";
import TrainCard from "@/components/Card/route";
import DBAPI from "@/api";
import Loading from "@/components/Loading";
import Recommended from "@/components/Card/recommended";

export default function Home() {
    const dbApi = new DBAPI();
    const [results, setResults] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div className="flex flex-col items-center justify-items-center min-h-screen p-4 gap-16 font-[family-name:var(--font-geist-sans)]">
            <Header />
            <main className="flex flex-col gap-2 w-[90vw] max-w-[900px]">
                <Search results={results} setResults={setResults} setLoading={setLoading} />

                {loading && (
                    <div className="mt-12">
                        <Loading />
                    </div>
                )}

                <div className="mt-4">
                    {results && results?.length > 0 && (
                        <>
                            <Message text="Hello" />
                            {/* <Recommended route={results[0]} /> */}
                        </>
                    )}
                </div>


                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 my-6">
                    {results?.map((e: any) => {
                        const o = JSON.parse(e).verbindungen;
                        return o.map((r:any) => {
                            return <TrainCard route={r} />;
                        });
                    })}
                </div>
            </main>
        </div>
    );
}
