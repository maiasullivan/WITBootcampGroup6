import { useEffect, useState, useRef } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Chart,
} from 'chart.js';
import awsExports from './../../../amplify_outputs.json';
import './../../index.css'; // Import the updated CSS file
import { generateClient } from 'aws-amplify/data';
import type { Schema } from './../../../amplify/data/resource';
import { Link } from 'react-router-dom';
import logo from './../images/logo.png';



Amplify.configure(awsExports);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const client = generateClient<Schema>();

const lineChartOptions = {
  maintainAspectRatio: false, // Allow the chart to not maintain aspect ratio
  responsive: true, // Allow the chart to be responsive
  aspectRatio: 2, // Set a custom aspect ratio for the chart
  scales: {
    x: {
      ticks: {
        autoSkip: true, // Automatically skip ticks to fit the chart width
        maxRotation: 0, // Rotate X-axis labels if needed
        sampleSize: 5, // Number of data points to include in the labels
      },
    },
  },
};

function Dashboard() {
  const [dataSet1, setDataSet1] = useState<number[]>([]);
  const [dataSet2, setDataSet2] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const chartRef1 = useRef<Chart<"line"> | null>(null);
  const chartRef2 = useRef<Chart<"line"> | null>(null);

  useEffect(() => {
    const subscription = client.models.Todo.observeQuery().subscribe({});

    // Function to generate time-based labels
    const generateLabels = () => {
      const now = new Date();
      return Array.from({ length: 20 }, (_, i) => {
        const date = new Date(now.getTime() - (20 - 1 - i) * 1000);
        return date.toLocaleTimeString();
      });
    };

    // Function to fetch initial data and initialize charts
    const initializeData = () => {
      const initialData = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
      setDataSet1(initialData);
      setDataSet2(initialData);
      setLabels(generateLabels());
    };

    initializeData();

    // Function to update chart data dynamically
    const updateData = () => {
      setTimeout(() => {
        setDataSet1((prevData) => {
          const newData = [...prevData, Math.floor(Math.random() * 100)];
          return newData.slice(-20);
        });
        setDataSet2((prevData) => {
          const newData = [...prevData, Math.floor(Math.random() * 12) + 4];
          return newData.slice(-20);
        });
        setLabels(generateLabels());

        // Update the chart each second
        if (chartRef1.current) {
          chartRef1.current.update();
        }
        if (chartRef2.current) {
          chartRef2.current.update();
        }
        
        updateData();
      }, 1000); // Delay of 1000ms or 1 second
    };

    updateData();

    return () => subscription.unsubscribe();
  }, []);

  const lineData1 = {
    labels: labels,
    datasets: [
      {
        label: '04-07-2024',
        data: dataSet1,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  const lineData2 = {
    labels: labels,
    datasets: [
      {
        label: '04-07-2024',
        data: dataSet2,
        fill: false,
        borderColor: 'rgb(153, 102, 255)',
      },
    ],
  };

  return (
    <Authenticator>
      <div className="container">
        <aside className="sidebar">
        <div className="logo">
          <img src={logo} alt="Generated Report" className="report-image-small" />
          </div>
          <div className="horizontal-line"></div>
          <div className="menu-header">MENU</div>
          <ul className="menu">
            <li>
              <a href="#">
                <span className="icon">🏠</span>Dashboard
              </a>
            </li>
            <li>
  <Link to="/report">
    <span className="icon">📊</span>Reports
  </Link>
</li>
            <li>
              <a href="#">
                <span className="icon">⚙️</span>Settings
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon">👤</span>Account
              </a>
            </li>
          </ul>
          <div className="menu-header">OTHERS</div>
          <ul className="menu">
            <li>
              <a href="#">
                <span className="icon">💬</span>Support
              </a>
            </li>
          </ul>
        </aside>
        <main className="content">
          <header className="header">
            <input className="search-bar" type="text" placeholder="Search..." />
            <div className="horizontal-line"></div>
          </header>
          <h1>Dashboard</h1>
          <div>
            <h3>Welcome Jun</h3>
            <div className="chart-container-hr">
            <div className="chart-container-hr">
  <div className="chart-header-hr">
    <h2 className="chart-title-hr">&emsp;&emsp;&emsp;&emsp;&emsp;Heart Rate</h2>
  </div>
  <div className="buttons-graph-container">
    <ul className="timeframe-buttons">
    <li></li><li></li><li></li>
      <li><button>30 seconds</button></li>
      <li><button>2 minutes</button></li>
      <li><button>5 Minutes</button></li>
    </ul>
    <div className="graph-content">
    <Line ref={chartRef1} data={lineData1} options={lineChartOptions} />
    </div>
  </div>
</div>
<div className="chart-container-bs">
  <div className="chart-header-bs">
    <h2 className="chart-title-bs">&emsp;&emsp;&emsp;&emsp;&emsp;Blood Sugar</h2>
  </div>
  <div className="buttons-graph-container">
    <ul className="timeframe-buttons">
      <li></li><li></li><li></li>
    <li><button>30 seconds</button></li>
      <li><button>2 minutes</button></li>
      <li><button>5 Minutes</button></li>
    </ul>
    <div className="graph-content">
    <Line ref={chartRef2} data={lineData2} options={lineChartOptions} />
    </div>
  </div>
</div>
</div>

          </div>
        </main>
      </div>
    </Authenticator>
  );
}

export default Dashboard;
