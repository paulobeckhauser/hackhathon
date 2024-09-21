import axios from "axios";
import { createObjectCsvWriter as csvWriter } from "csv-writer";

const sendRequest = async (page) => {
    try {
        let data =
            "search_pep%5Bglobal%5D=&search_pep%5Binstitution%5D=&search_pep%5Btrademark%5D=&search_pep%5Bnomenclature%5D=332&search_pep%5Bexpires%5D%5Bday%5D=&search_pep%5Bexpires%5D%5Bmonth%5D=&search_pep%5Bexpires%5D%5Byear%5D=&search_pep%5B_token%5D=f686221c4a585ca36c56d1bd48.-fySt55nz0H2xFKWj1AYKa16T7qsgyW4vOLYGfwV5MI.poT5_PEoii6OhSavzBZPQ8kfCMqetFTN9Ie8Rq1-l7igi6TNr1O4C52PHw";

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `https://register.pep-ecopassport.org/xhr/searchPep?page=${page}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                Accept: "*/*",
                "Sec-Fetch-Site": "same-origin",
                "Accept-Language": "en-US,en;q=0.9",
                "Accept-Encoding": "gzip, deflate, br",
                "Sec-Fetch-Mode": "cors",
                Host: "register.pep-ecopassport.org",
                Origin: "https://register.pep-ecopassport.org",
                "Content-Length": "370",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15",
                Referer: "https://register.pep-ecopassport.org/pep/consult",
                Connection: "keep-alive",
                "Sec-Fetch-Dest": "empty",
                Cookie: "PHPSESSID=bma9k62pl7fvdo8djoj79h0j9j; _ga=GA1.2.627963293.1726859844; _ga_NYKQ8KFWXH=GS1.2.1726859844.1.1.1726859868.0.0.0; _gid=GA1.2.881201033.1726859844; PHPSESSID=r1g2kdtic6mu5ga894bni780tm",
                "X-Requested-With": "XMLHttpRequest",
            },
            data: data,
        };

        return await axios.request(config);
    } catch (err) {
        console.log(err);
    }
};

async function main() {
    try {
        const writer = csvWriter({
            path: 'output.csv',
            header: [
            {id: 'url', title: 'URL'}
            ]
        });

        let records = [];

        for(let i = 1; i <= 15; i++){
            const response = await sendRequest(i);
            const { result } = response.data;

            const matches = result.split("storeHistorySearch").map((item) => {
            if (item.includes("href")) {
                return item.split('href="')[1].split('"')[0];
            }
            });

            const filtered = matches.map((e) => `https://register.pep-ecopassport.org${e}`).filter((e,i) => i % 2 === 0);

            filtered.shift();
            records = records.concat(filtered.map(url => ({ url })));
            console.log(filtered);
        }

        await writer.writeRecords(records);
        console.log('CSV file was written successfully');
    } catch (er) {
        console.error(er);
    }
}

main();
