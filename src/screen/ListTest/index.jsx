import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TestClientApi from "../../api/entities/TestClientApi";
import VerifyPopup from "./VerifyPopup";
// import "./ListTest.css";

const ListTest = () => {
  const [lsTest, setLsTest] = useState([]);
  const [currentTest, setCurrentTest] = useState({});
  const [testResult, setTestResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    TestClientApi.getTests.then((rs) => {
      setLsTest(rs.data.data);
    });
  }, []);

  return (
    <div>
      <VerifyPopup
        open={isOpen}
        handleClose={() => {
          setIsOpen(false);
        }}
        link={data.link}
        testName={data.testName}
      />
      <div
        className="card row"
        style={{
          margin: "12px 24px",
          minHeight: "500px",
        }}
      >
        <div className="list-test card" style={{ padding: 10, width: '96%', marginLeft: 25 }}>
          <h2>Danh sách bài thi</h2>
          <ul>
            {lsTest.map((test, key) => (
              <li
                key={key}
                onClick={() => {
                  setIsOpen(true);
                  setData({
                    link: `/client/test?id=${test.id}&testCode=${test.testCode}`,
                    testName: test.testName,
                  });
                }}
              >
                <span style={{width: 200}}>
                  {test.testCode}
                </span>
                <span>
                  {test.testName}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListTest;
