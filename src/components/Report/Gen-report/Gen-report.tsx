import { useRef } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
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
import { Line } from 'react-chartjs-2';
import awsExports from '../../../../amplify_outputs.json';
import logo from './../../images/logo.png';
import './../../../index.css'; // Import the updated CSS file
import { Link } from 'react-router-dom';

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

function GenReport() {
  const chartRef1 = useRef<Chart<"line"> | null>(null);
  const chartRef2 = useRef<Chart<"line"> | null>(null);
  const chartRef3 = useRef<Chart<"line"> | null>(null);

  const dates = ['June 15', 'June 16', 'June 17', 'June 18', 'June 19', 'June 20', 'June 21', 'June 22', 'June 23', 'June 24', 'June 25'];
  const heartRateData = [72, 74, 70, 72, 75, 78, 77, 74, 76, 74, 77];
  const bloodSugarData = [89, 86, 85, 90, 95, 92, 88, 91, 89, 89, 90];
  const bloodOxygenData = [96, 97, 97, 98, 97, 99, 96, 97, 98, 97, 96];

  const dataTemplate = (label: string, data: number[], color: string) => ({
    labels: dates,
    datasets: [
      {
        label,
        data,
        fill: false,
        borderColor: color,
        tension: 0.1,
      },
    ],
  });

  const heartRateChartData = dataTemplate('Heart Rate (bpm)', heartRateData, 'rgb(255, 99, 132)');
  const bloodSugarChartData = dataTemplate('Blood Sugar (mg/dL)', bloodSugarData, 'rgb(54, 162, 235)');
  const bloodOxygenChartData = dataTemplate('Blood Oxygen (%)', bloodOxygenData, 'rgb(75, 192, 192)');

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  
  return (
    <Authenticator>
      <div className="container">
        <aside className="sidebar">
          <div className="logo">
            <img src={logo} alt="Logo" className="report-image-small" />
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
          <h1>General Report</h1>
          <div className="chart-container">
            <h2 className="chart-title">Heart Rate (bpm)</h2>
            <div className="chart-wrapper">
              <Line ref={chartRef1} data={heartRateChartData} options={options} />
            </div>
          </div>
          <div className="chart-container">
            <h2 className="chart-title">Blood Sugar (mg/dL)</h2>
            <div className="chart-wrapper">
              <Line ref={chartRef2} data={bloodSugarChartData} options={options} />
            </div>
          </div>
          <div className="chart-container">
            <h2 className="chart-title">Blood Oxygen (%)</h2>
            <div className="chart-wrapper">
              <Line ref={chartRef3} data={bloodOxygenChartData} options={options} />
            </div>
          </div>
        </main>
      </div>
    </Authenticator>
  );
}

export default GenReport;