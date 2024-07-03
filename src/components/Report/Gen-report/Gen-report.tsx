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
} from 'chart.js';
import awsExports from '../../../../amplify_outputs.json';
import heartReport from './../../images/gen-report.png';
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
          <h1>General Report</h1>
          <div>
          <img src={heartReport} alt="Generated Report" className="report-image-small" />
          </div>
        </main>
      </div>
    </Authenticator>
  );
}

export default GenReport;
