import {asyncHandler} from '../utils/asyncHandler.js'
import pool from '../db/db.js'

async function fetchAndStoreCryptoData(){
    try {
        const data = await fetch("https://api.wazirx.com/api/v2/tickers")
        .then((result) => result.json())
        .then((res) => Object.values(res).slice(0,10))

        await pool.query('DELETE FROM "cryptodata"');

        for(const eachData of data){
            const {name, last, buy, sell, volume, base_unit} = eachData
            await pool.query(
                `INSERT INTO "cryptodata" (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)`,
                [name, last, buy, sell, volume, base_unit]
            )       
        }   

        console.log("API results fetched and stored successfully")

    } catch (error) {
        console.log("Error in fetching and Storing API results ", error)
    }
}

const topTenResults = asyncHandler( async(req, res) => {
    try {
        const data = await pool.query('SELECT * FROM "cryptodata"');
        return res.status(200).json({
            data : data.rows,
        })
    } catch (error) {
        console.log("Error in fetching API results ", error)
    }
})

setInterval(fetchAndStoreCryptoData, 60000)
fetchAndStoreCryptoData();


export {
    topTenResults
}