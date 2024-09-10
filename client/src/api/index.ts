"use strict";

import axios from "axios";
import qs from "qs";

class DBAPI {
    private _host: string = process.env.HOST || "http://localhost:8000";

    constructor() {}

    async getCity(city: string) {
        try {
            const response = await axios.get(`${this._host}/citySearch/${city}`);

            return response;
        } catch (error: any) {
            return error?.response || { status: 404 };
        }
    }

    async searchConnections(from: string, to: string, date: string) {
        try {
            const response = await axios.post(`${this._host}/connectionSearch`, {
                frm: from,
                to: to,
                datetime: date,
            });

            return response;
        } catch (error: any) {
            return error?.response || { status: 404 };
        }
    }

    async share(from: string, to: string, date: string, transferId: string) {
        try {
            const response = await axios.post(`${this._host}/shareCon`, {
                frm: from,
                to: to,
                datetime: date,
                tfID: transferId,
            });

            return response;
        } catch (error: any) {
            return error?.response || { status: 404 };
        }
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
