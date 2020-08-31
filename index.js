require("dotenv").config();
const Binance = require("binance-api-node").default;
var tulind = require('tulind');

const client = Binance();

// Authenticated client, can make signed calls
const client2 = Binance({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
});

async function main() {
  console.log(await client.time());
  const candles = await client.candles({
    symbol: "ETHBTC",
    interval: "30m",
    limit: "1000",
  });

  const closes = candles.map((candle) => parseFloat(candle.close));
  console.log(closes)

  
  // tulind.indicators.sma.indicator([closes], [3], function(err, results) {
  //   console.log("Result of sma is:");
  //   console.log(results[0]);
  // });

  tulind.indicators.macd.indicator([closes], [12, 26, 9], function(err, results) {
    console.log("Result of MACD is:");
    console.log(results);
  });

}

main();
