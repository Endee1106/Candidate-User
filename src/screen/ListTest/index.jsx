import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TestClientApi from "../../api/entities/TestClientApi";
// import "./ListTest.css";

const ListTest = () => {
  const [lsTest, setLsTest] = useState([]);
  const [currentTest, setCurrentTest] = useState({});
  const [testResult, setTestResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    TestClientApi.getTests.then((rs) => {
      setLsTest(rs.data.data);
    });
  }, []);

  const handleAnswerQs = (sectionIndex, questionIndex, value) => {
    try {
      let ts = [...testResult];
      ts[sectionIndex].questionSections[questionIndex].answerText = value;
      setTestResult(ts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitTest = async () => {
    try {
      setIsLoading(true);
      const userID = JSON.parse(sessionStorage.getItem("info"))?.id || "";
      const answer = {
        accountId: userID,
        testAnswer: {
          id: currentTest.id,
          sections: testResult,
        },
      };
      let rs = await TestClientApi.submitTest(answer);
      if (rs.status !== 200) {
        window.alert("Something wrong");
      } else {
        window.alert("Gửi bài thi thành công");
      }
      setIsLoading(true);
    } catch (error) {
      window.alert("Something wrong");
      console.log(error);
    }
  };

  return (
    <div>
      <div
        className="card row"
        style={{
          margin: "12px 24px",
          minHeight: "500px",
        }}
      >
        <div className="list-test card" style={{ padding: 0 }}>
          <h2>Danh sách bài thi</h2>
          <ul>
            {lsTest.map((test, key) => (
              <li key={key}>
                <Link
                  to={`/client/test?id=${test.id}&testCode=${test.testCode}`}
                >
                  {test.testName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListTest;
