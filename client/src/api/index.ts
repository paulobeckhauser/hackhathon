"use strict";

import axios from "axios";
import qs from "qs";

class DBAPI {
    private _host: string = process.env.HOST || "http://localhost:8000";

    constructor() {}

    async getCity(city: string) {
        const response = await axios.get(`${this._host}/citySearch/${city}`);

        return response.data;
    }

    async searchConnections(from: string, to: string, date: string) {
        const response = await axios.post(`${this._host}/connectionSearch`, {
            frm: from,
            to: to,
            datetime: date,
        });

        return JSON.parse(response.data);
    }

    // async searchConnections2(from: string, to: string, date: string) {
    //     const queryParams = qs.stringify({
    //         station_from: from,
    //         station_to: to,
    //         datetime: date,
    //     });

    //     const response = await axios.get(
    //         `${this._host}/connectionSearch?${queryParams}`
    //     );

    //     return response.data;
    // }
}

export default DBAPI;
