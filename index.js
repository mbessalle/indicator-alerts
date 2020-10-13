require("dotenv").config();
const Binance = require("binance-api-node").default;
var tulind = require("tulind");
const express = require("express");
const app = express();
const port = 3000;

const client = Binance();
let sma_results;
// Authenticated client, can make signed calls
const client2 = Binance({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
});

async function main() {
  // console.log(await client.time());
  const candles = await client.candles({
    symbol: "BTCUSDT",
    interval: "1w",
    limit: "1000",
  });
  console.log(candles);
  const data = candles.map((candle) => ({
    price: parseFloat(candle.close),
    time: candle.closeTime,
  }));

  app.get("/", (req, res) => {
    res.append("Access-Control-Allow-Origin", "*").json(data);
  });

  
  const closes = candles.map((candle) => parseFloat(candle.close));

 tulind.indicators.sma.indicator([closes], [21], function(err, results) {
    console.log("Result of sma is:");
    sma_results = results[0];
    console.log(sma_results)
  });
  app.get("/sma", (req, res) => {
    res.append("Access-Control-Allow-Origin", "*").json(sma_results);
  });
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

main();
