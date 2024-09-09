"use strict";

import axios from "axios";

class DBAPI {
    constructor() {}

    async getCity(city: string) {
        const response = await axios.get(
            `http://localhost:8000/citySearch/${city}`
        );

        return response.data;
    }
}

export default DBAPI;
