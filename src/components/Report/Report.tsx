import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './../../../amplify_outputs.json';
import './../../index.css'; // Import the updated CSS file
import './Report.css'; // Import the updated CSS file
import { Link } from 'react-router-dom';
 
Amplify.configure(awsExports);
 
 
function Report() {
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
                <span className="icon">🏠</span>Report
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
          <h1 className="main-title">Reports Overview</h1>
          <div className="reports-container">
            <div className="report-item report-item-1">
              <Link to="/report/general">
              <div className="report-info"></div>
              <div className="report-info"></div>
              <h2>General Report</h2>
              <span className="files">10 files</span>
               </Link>
              </div>

            <div className="report-item report-item-2">
              <div className="report-info">
                <h2>Heart Rate</h2>
                <span className="files">2 files</span>
              </div>
            </div>
            <div className="report-item report-item-3">
              <div className="report-info">
                <h2>Blood Sugar</h2>
                <span className="files">3 files</span>
              </div>
            </div>
            <div className="report-item report-item-4">
              <div className="report-info">
                <h2>Blood Oxygen</h2>
                <span className="files">1 file</span>
              </div>
            </div>
            <div className="report-item report-item-5">
              <div className="report-info">
                <h2>Blood Pressure</h2>
                <span className="files">1 file</span>
              </div>
            </div>
            <div className="report-item report-item-6">
              <div className="report-info">
                <h2>Blood Temperature</h2>
                <span className="files">1 file</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Authenticator>
  );
}
export default Report;