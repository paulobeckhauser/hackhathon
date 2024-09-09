import { Card, Button } from "@nextui-org/react";
import Link from "next/link";

interface TrainCardProps {
    route: any;
}

export default function TrainCard({ route }: TrainCardProps) {
    const verbindungsAbschnitt = route.verbindungsAbschnitte[0];
    const abfahrtsZeitpunkt = new Date(verbindungsAbschnitt.abfahrtsZeitpunkt);
    const ankunftsZeitpunkt = new Date(verbindungsAbschnitt.ankunftsZeitpunkt);
    const duration = verbindungsAbschnitt.abschnittsDauer / 60; // convert seconds to minutes
    const price = route?.angebotsPreis?.betrag.toFixed(2) || undefined;

    const hasDelay = verbindungsAbschnitt.himMeldungen.some(
        (meldung: any) => meldung.ueberschrift.includes("Verspätung") || meldung.text.includes("Verspätung")
    );

    return (
        <div className="flex justify-center items-center">
            <Card className="w-[360px] h-[400px]">
                {/* Header Section */}
                <div className="p-4 border-b">
                    <div className="flex justify-between">
                        <div>
                            {hasDelay && (
                                <div className="flex space-x-2 mt-2">
                                    <p className="text-lg text-red-600">
                                        {abfahrtsZeitpunkt.toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: false,
                                        })}
                                    </p>
                                    <p className="text-lg text-red-600">
                                        {ankunftsZeitpunkt.toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: false,
                                        })}
                                    </p>
                                </div>
                            )}
                            <h2 className={`${hasDelay ? "text-xs" : "text-lg"} font-semibold`}>
                                {abfahrtsZeitpunkt.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                })}{" "}
                                -{" "}
                                {ankunftsZeitpunkt.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                })}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {Math.floor(duration / 60)}h {duration % 60}min
                            </p>
                        </div>
                    </div>
                </div>

                {/* Train Connections Section */}
                <div className="flex p-4 space-x-2">
                    {/* Train Badges */}
                    <span className="flex-1 text-center bg-gray-700 text-white rounded-lg py-1 px-2 text-sm">
                        {verbindungsAbschnitt.verkehrsmittel.kurzText} {verbindungsAbschnitt.verkehrsmittel.nummer}
                    </span>
                    <span className="flex-1 text-center bg-gray-500 text-white rounded-lg py-1 px-2 text-sm">RB</span>
                </div>

                {/* Body Section */}
                <div className="p-4">
                    <div className="flex justify-between">
                        <p className="font-semibold">{verbindungsAbschnitt.abfahrtsOrt}</p>
                        <p className="font-semibold">{verbindungsAbschnitt.ankunftsOrt}</p>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-600 mt-3">
                        <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                        <p>{verbindungsAbschnitt.himMeldungen.length > 0 ? verbindungsAbschnitt.himMeldungen[0].text : "Es liegen Meldungen vor."}</p>
                    </div>

                    <div className="mt-3">
                        <details>
                            <summary className="cursor-pointer text-blue-500">Details</summary>
                            <p className="text-gray-600 mt-2">Additional information can go here.</p>
                        </details>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="p-4 border-t flex justify-between items-center mt-auto">
                    {price && <p className="text-lg font-semibold">ab {price} €</p>}
                    <Link href="" target="_blank">
                        <Button color="primary">Weiter</Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
}
