import DBAPI from "@/api";
import { Card, Button } from "@nextui-org/react";
import Link from "next/link";
import { FaWalking } from "react-icons/fa";

interface TrainCardProps {
    route: any;
    recommended?: boolean;
}

export default function TrainCard({ route, recommended }: TrainCardProps) {
    const dbApi = new DBAPI();
    
    const connections = route?.verbindungsAbschnitte || 0;
    const verbindungsAbschnitt = route?.verbindungsAbschnitte[0];
    const abfahrtsZeitpunkt = new Date(verbindungsAbschnitt?.abfahrtsZeitpunkt);
    const ankunftsZeitpunkt = new Date(verbindungsAbschnitt?.ankunftsZeitpunkt);
    const duration = verbindungsAbschnitt?.abschnittsDauer / 60;
    const price = route?.angebotsPreis?.betrag.toFixed(2) || undefined;

    const hasDelay = verbindungsAbschnitt.himMeldungen.some(
        (meldung: any) => meldung.ueberschrift.includes("Verspätung") || meldung.text.includes("Verspätung")
    );

    const share = async () => {
        const response = await dbApi.share(verbindungsAbschnitt.abfahrtsOrt, verbindungsAbschnitt.ankunftsOrt, abfahrtsZeitpunkt.toISOString(), route.ctxRecon);

        const vbid = JSON.parse(response.data).vbid;

        window.open(`https://www.bahn.de/buchung/start?vbid=${vbid}`, "_blank");
    };

    return (
        <div className="flex justify-center items-center">
            <Card className={`w-[360px] min-h-[400px] ${recommended && "bg-blue-100 shadow-2xl"}`} >
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
                <div className={`flex gap-2 p-4`}>
                    {(() => {
                        const totalDuration = connections.reduce((sum: number, e: any) => sum + e.abschnittsDauer, 0);
                        const minWidth = 50;

                        return connections.map((e: any, index: number) => {
                            const color = e.verkehrsmittel.typ === "WALK" ? "bg-gray-200" : "bg-gray-600";
                            let widthPercentage = (e.abschnittsDauer / totalDuration) * 100;
                            const totalWidthPx = 100 * ((document.querySelector(".flex") as any)?.offsetWidth || 1); 
                            const calculatedWidthPx = (widthPercentage / 100) * totalWidthPx;

                            if (calculatedWidthPx < minWidth) {
                                widthPercentage = (minWidth / totalWidthPx) * 100;
                            }

                            return (
                                <div
                                    key={index}
                                    className={`flex items-center justify-center text-center ${color} text-white rounded-lg text-sm p-1`}
                                    style={{ width: `${widthPercentage}%`, minWidth: `${minWidth}px` }}
                                >
                                    {e.verkehrsmittel.typ === "WALK" ? (
                                        <div className="text-gray-600">
                                            <FaWalking className="text-2xl" />
                                            <span className="mr-1 text-xs">{e.distanz}M</span>
                                        </div>
                                    ) : (
                                        <span>{e.verkehrsmittel.name}</span>
                                    )}
                                </div>
                            );
                        });
                    })()}
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
                    <Button color="primary" onClick={share}>
                        Weiter
                    </Button>
                </div>
            </Card>
        </div>
    );
}
