import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export function Chart01() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Désactive l'affichage de la légende
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", // Définir les labels de l'axe x en blanc
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Définir les lignes de la grille de l'axe x en blanc avec transparence
        },
      },
      y: {
        ticks: {
          color: "white", // Définir les labels de l'axe y en blanc
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Définir les lignes de la grille de l'axe y en blanc avec transparence
        },
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
  ];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        data: [100, 200, 130, 740, 650, 860, 370, 1002, 452, 854, 965, 742],
        borderColor: "rgb(255,255,255)",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        cubicInterpolationMode: "monotone",
        tension: 0.4,
      },
    ],
  };
  return <Line options={options} data={data as any} className="w-full" />;
}
