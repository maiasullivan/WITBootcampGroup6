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

function Dashboard() {
  const [dataSet1, setDataSet1] = useState<number[]>([]);
  const [dataSet2, setDataSet2] = useState<number[]>([]);
  const chartRef1 = useRef<Chart<"line"> | null>(null);
  const chartRef2 = useRef<Chart<"line"> | null>(null);

  useEffect(() => {
    const subscription = client.models.Todo.observeQuery().subscribe({});

    // Function to fetch initial data and initialize charts
    const initializeData = () => {
      const initialData = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
      setDataSet1(initialData);
      setDataSet2(initialData);
    };

    initializeData();

    // Function to update chart data dynamically
    const updateData = () => {
      setInterval(() => {
        setDataSet1((prevData) => {
          const newData = [...prevData, Math.floor(Math.random() * 100)];
          return newData.slice(-20);
        });
        setDataSet2((prevData) => {
          const newData = [...prevData, Math.floor(Math.random() * 100)];
          return newData.slice(-20);
        });

        // Update the chart each second
        if (chartRef1.current) {
          chartRef1.current.update();
        }
        if (chartRef2.current) {
          chartRef2.current.update();
        }
      }, 1000);
    };

    updateData();

    return () => subscription.unsubscribe();
  }, []);

  const lineData1 = {
    labels: Array.from({ length: 20 }, (_, i) => `Point ${i + 1}`),
    datasets: [
      {
        label: 'Dataset 1',
        data: dataSet1,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  const lineData2 = {
    labels: Array.from({ length: 20 }, (_, i) => `Point ${i + 1}`),
    datasets: [
      {
        label: 'Dataset 2',
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
            <h2>Logo</h2>
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
              <a href="#">
                <span className="icon">📊</span>Reports
              </a>
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
            <h2>Welcome Jun</h2>
            <div className="chart-container">
              <h2 className="chart-title">Line Graph 1</h2>
              <Line ref={chartRef1} data={lineData1} />
            </div>
            <div className="chart-container">
              <h2 className="chart-title">Line Graph 2</h2>
              <Line ref={chartRef2} data={lineData2} />
            </div>
          </div>
        </main>
      </div>
    </Authenticator>
  );
}

export default Dashboard;
