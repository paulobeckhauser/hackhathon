"use strict";

import axios from "axios";

class DBAPI {
    constructor() {}

    async getCity(city: string) {
        const response = await axios.get(
            `https://www.bahn.de/web/api/reiseloesung/orte?suchbegriff=${city}&typ=ALL&limit=10`,
            {
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1",
                    Accept: "application/json",
                    "Accept-Language": "de",
                    "Accept-Encoding": "gzip, deflate, br, zstd",
                    Referer: "https://www.bahn.de/buchung/fahrplan/suche",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "same-origin",
                },
            }
        );

        return response.data;
    }
}

export default DBAPI;