import './App.css';
import {
  Routes,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

import LoginPage from './component/LoginPage';
import CandidatePage from './component/CandidatePage';
import ListTest from './component/content/ListTest'
import DoTest from './component/content/DoTest'
import TestResult from './component/content/TestResult'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes >
            <Route exact path="/" element={<LoginPage />} />
            <Route path="/candidate" element={<CandidatePage />} >
              <Route exact path="" element={<ListTest />} />
              <Route path="dotest" element={<DoTest />} />
              <Route path="testresult" element={<TestResult />} />
            </Route>
          </Routes >
        </div>
      </Router>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
