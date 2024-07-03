import { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import type { Schema } from './../../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import awsExports from './../../../amplify_outputs.json';
import './Dashboard.css'; // Import the CSS file

Amplify.configure(awsExports);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const client = generateClient<Schema>();

function Dashboard() {
  useEffect(() => {
    const subscription = client.models.Todo.observeQuery().subscribe({});
    return () => subscription.unsubscribe();
  }, []);

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
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
          <ul className="menu">
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Reports</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Account</a></li>
          </ul>
        </aside>
        <main className="content">
          <header className="header">
            <h1>Dashboard</h1>
            <input className="search-bar" type="text" placeholder="Search..." />
          </header>
          <div>
            <h2>Welcome Jun</h2>
            <ul></ul>
            <div>
              🥳 App successfully hosted. Try creating a new todo.
              <br />
            </div>
            <div className="chart-container">
              <h2 className="chart-title">Line Graph 1</h2>
              <Line data={lineData} />
            </div>
            <div className="chart-container">
              <h2 className="chart-title">Line Graph 2</h2>
              <Line data={lineData} />
            </div>
          </div>
        </main>
      </div>
    </Authenticator>
  );
}

export default Dashboard;
