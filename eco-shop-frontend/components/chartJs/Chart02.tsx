import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function Chart02() {
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
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        backgroundColor: "rgba(255,255,255)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
