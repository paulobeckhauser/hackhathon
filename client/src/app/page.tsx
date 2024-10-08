"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Message from "@/components/Messages/Message";
import Search from "@/components/Search";
import TrainCard from "@/components/Card/route";
import DBAPI from "@/api";
import Loading from "@/components/Loading";
import Recommended from "@/components/Card/recommended";
import { Divider } from "antd";

export default function Home() {
    const [results, setResults] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div className="flex flex-col items-center justify-items-center min-h-screen p-4 gap-6 font-[family-name:var(--font-geist-sans)]">
            <Header />
            <main className="flex flex-col gap-2 w-[90vw] max-w-[900px]">
                <Search results={results} setResults={setResults} setLoading={setLoading} />

                {loading && (
                    <div className="mt-12">
                        <Loading />
                    </div>
                )}

                {results && results.recommended && (
                    <div className="my-4 py-5 ">
                        <Divider className="mt-0" />
                        <h2 className="text-center text-xl">Assistant Recommendation: </h2>
                        <Message text={results.recommended.description || ""} />
                        <Recommended route={results?.verbindungen[results.recommended.id]} />
                        <Divider />
                    </div>
                )}

                {results && results.verbindungen && results.verbindungen.length > 0 && (
                    <>
                        <h2 className="text-center text-lg">All Offers</h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 my-6">
                            {results?.verbindungen?.map((e: any) => {
                                return <TrainCard route={e} />;
                            })}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
