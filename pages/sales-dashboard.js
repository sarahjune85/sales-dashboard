import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

// const labels = ["January", "February", "March", "April", "May", "June", "July"];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: "rgb(255, 99, 132)",
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//     {
//       label: "Dataset 2",
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: "rgb(53, 162, 235)",
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//     },
//   ],
// };

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

let currentTime = new Date();
const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
console.log(currentTime.toLocaleDateString(undefined, options));

export default function Home() {
  const { query } = useRouter();
  const { data, error } = useSWR(() => query && `/api/orders`, fetcher);
  console.log(data);

  const { revQuery } = useRouter();
  const { revData, revError } = useSWR(() => revQuery && `/api/revenue`, fetcher);
  console.log(revData);

  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Super Awesome Metrics Dashboard</title>
        <meta name="description" content="Getter sales" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Nav */}
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6 h-2/5">
          <Image src="/getter-logo-light.png" alt="Getter Logo" width="130" height="50" />
        </div>
        <div>
          <span className="inline-block text-xl leading-none text-white mt-4 lg:mt-0 font-bold">
            {currentTime.toLocaleDateString(undefined, options)} @{" "}
            {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </nav>
      {/* State List */}
      <div className="grid grid-flow-row grid-cols-3 grid-rows-2 gap-7 text-center h-2/5">
        <div className="basis-1/3 rounded-lg shadow-xl bg-white min-w-fit m-5">
          <div className="p-5">
            <header className="font-semibold text-2xl my-6">Today&apos;s Orders</header>
            <p className="text-gray-500 py-4 text-7xl">{data[0].nsw}</p>
            <footer className="text-center mt-9 text-2xl">NSW</footer>
          </div>
        </div>
        <div className="basis-1/3 rounded-lg shadow-xl bg-white min-w-fit m-5">
          <div className="p-5">
            <header className="font-semibold text-2xl my-6">Today&apos;s Orders</header>
            <p className="text-gray-500 py-4 text-7xl">{data[0].qld}</p>
            <footer className="text-center mt-9 text-2xl">QLD</footer>
          </div>
        </div>
        <div className="basis-1/3 rounded-lg shadow-xl bg-white min-w-fit m-5">
          <div className="p-5">
            <header className="font-semibold text-2xl my-6">Today&apos;s Orders</header>
            <p className="text-gray-500 py-4 text-7xl">{data[0].vic}</p>
            <footer className="text-center mt-9 text-2xl">VIC</footer>
          </div>
        </div>
        {/* Chart row */}
        <div className="col-span-3 rounded-lg shadow-xl bg-white h-80 min-w-fit m-5">
          <canvas id="myChart">
            {/* <Line options={chartOptions} data={revData} /> */}
          </canvas>
        </div>
      </div>
    </div>
  );
}
