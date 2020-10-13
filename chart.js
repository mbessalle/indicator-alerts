async function main() {
  const ctx = document.getElementById("myChart").getContext("2d");
  let response, sma_response, sma;
  try {
    response = await fetch("http://localhost:3000/");
    sma_response = await fetch("http://localhost:3000/sma");
    price_time_data = await response.json();
    sma = await sma_response.json();
  } catch (error) {
    console.error(error);
  }

  console.log(sma);
  const prices = [];
  const times = [];
  console.log(price_time_data);
  price_time_data.forEach((price_time) => {
    prices.push(price_time.price);
    times.push(price_time.time);
  });

  dates = times.map((time) => new Date(time));
  const chartOptions = {
    type: "line",
    data: {
      labels: dates.slice(20),
      datasets: [
        {
          label: "BTC/USDT",
          borderColor: "rgb(255, 99, 132)",
          data: prices.slice(20),
        },
        {
          label: "SMA",
          borderColor: "rgb(99,132,255)",
          data: sma,
        },
      ],
    },
    options: {},
  };

  new Chart(ctx, chartOptions);
}
main();
