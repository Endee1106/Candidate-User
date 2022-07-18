import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import TestClientApi from "../../api/entities/TestClientApi";
import Section from "./Section";
import "./testscreen.css";
import { useSearchParams } from "react-router-dom";

const TestScreen = (props) => {
  const [lsTest, setLsTest] = useState([]);
  const [currentTest, setCurrentTest] = useState({});
  const [testResult, setTestResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    TestClientApi.getTest(searchParams.get("id")).then((res) => {
      setCurrentTest(res.data.data);
      setTestResult(res.data.data.sections);
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
          minHeight: "800px",
        }}
      >
        <div className="card test-form" style={{ width: "100%" }}>
          {currentTest.id && (
            <>
              <h1>
                {currentTest.testName || ""}
                <Button
                  variant="outlined"
                  style={{ backgroundColor: "white", float: "right" }}
                  onClick={handleSubmitTest}
                >
                  Nộp bài
                </Button>
              </h1>
              <div className="test-form-content">
                {currentTest.sections.map((sec, key) => (
                  <Section
                    section={sec}
                    key={key}
                    testResult={testResult[key]}
                    handleAnswerQs={(questionId, value) => {
                      handleAnswerQs(key, questionId, value);
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestScreen;
