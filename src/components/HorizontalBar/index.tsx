import { Bar } from "react-chartjs-2";

const options = {
  indexAxis: "y",
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Population Bar Chart",
    },
  },
};

const HorizontalBarChart = ({ data: t = {} }: any) => {
  const final = {
    labels: t.labels || [],
    datasets: [{ ...t, data: t.data || [] }],
  };

  return <Bar style={{ height: "450px" }} data={final} options={options} />;
};

export default HorizontalBarChart;
