async function main() {
  const ctx = document.getElementById("myChart").getContext("2d");
  let response, closes;
  try {
    response = await fetch("http://localhost:3000/");
    closes = await response.json();
  } catch (error) {
    console.error(error);
  }

  const chartOptions = {
    type: "line",
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: closes,
        },
      ],
    },
    options: {},
  };

  new Chart(ctx, chartOptions);
}
main();
