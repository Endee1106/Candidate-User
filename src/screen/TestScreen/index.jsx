import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import TestClientApi from "../../api/entities/TestClientApi";
import Section from "./Section";
import "./testscreen.css";

const TestScreen = () => {
  const [lsTest, setLsTest] = useState([]);
  const [currentTest, setCurrentTest] = useState(data);
  const [testResult, setTestResult] = useState(data.sections);
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
          id: data.id,
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
        <div className="list-test card md-2" style={{ padding: 0 }}>
          <h2>Danh sách bài thi</h2>
          <ul>
            {lsTest.map((test, key) => (
              <li
                key={key}
                onClick={() => {
                  TestClientApi.getTest(test.id).then((res) => {
                    setCurrentTest(res.data.data);
                  });
                }}
              >
                {test.testName}
              </li>
            ))}
          </ul>
        </div>

        <div className="card md-8 test-form">
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

const data = {
  id: "ab89a60b-011d-42b4-43b7-08da45cf550c",
  testCode: "TC01",
  testName: "Test đầu vào",
  sections: [
    {
      sectionName: "Phần thi 1",
      id: 1,
      questionSections: [
        {
          question: {
            id: "10001",
            contentText: "Thủ đô vn là?",
            type: 1,
            contentListObject: [
              {
                key: "Hà tĩnh",
                value: false,
              },
              {
                key: "Hà Nội",
                value: true,
              },
            ],
          },
        },
        {
          question: {
            id: "10002",
            contentText: "Tỉnh của vn là?",
            type: 2,
            contentListObject: [
              {
                key: "Hà tĩnh",
                value: true,
              },
              {
                key: "Hà Nội",
                value: true,
              },
            ],
          },
        },
      ],
    },
    {
      sectionName: "Phần thi 2",
      id: 2,
      questionSections: [
        {
          question: {
            id: "10003",
            contentText: "Thủ đô tq là?",
            type: 1,
            contentListObject: [
              {
                key: "Hà tĩnh",
                value: false,
              },
              {
                key: "Bắc kinh",
                value: true,
              },
            ],
          },
        },
        {
          question: {
            id: "10004",
            contentText: "Tên bạn là gì?",
            type: 3,
          },
        },
      ],
    },
  ],
};

export default TestScreen;
