import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import LoginPage from "./screen/Login/LoginPage";
import AdminPage from "./component/AdminPage";
import HomeContent from "./screen/HomeContent/HomeContent";
import TestScreen from "./screen/TestScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListTest from "./screen/ListTest";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route path="/client" element={<AdminPage />}>
              <Route exact path="" element={<HomeContent />} />
              <Route path="test" element={<TestScreen />} />
              <Route path="listtest" element={<ListTest />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
