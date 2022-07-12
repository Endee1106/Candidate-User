import { Button } from "devextreme-react";
import React, { useEffect, useState } from "react";
import TestClientApi from "../../api/entities/TestClientApi";
import Section from "./Section";
import "./testscreen.css";

const TestScreen = () => {
  const [lsTest, setLsTest] = useState([]);
  const [currentTest, setCurrentTest] = useState(data);
  const [testResult, setTestResult] = useState({});

  useEffect(() => {
    TestClientApi.getTest.then((rs) => setLsTest(rs.data.data));
  }, []);

  const handleAnswerQs = (idQs, value) => {
    let ts = { ...testResult };
    ts[idQs] = value;
    setTestResult(ts);
  };

  const arrToObject = (arr) => {
    let ob = {};
    arr.forEach((ele) => {
      ob[ele[0]] = ele[1];
    });
    return ob;
  };

  console.log(testResult);

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
                  setCurrentTest(test);
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
              <h2>{currentTest.testName || ""}</h2>
              <div className="test-form-content">
                {currentTest.sections.map((sec, key) => (
                  <Section
                    section={sec}
                    key={key}
                    handleAnswerQs={(idQs, value) => {
                      handleAnswerQs(idQs, value);
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
      questionSections: [
        {
          question: {
            id: "10001",
            contentText: "Thủ đô vn là?",
            type: 1,
            contentJSON: [
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
            contentJSON: [
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
      questionSections: [
        {
          question: {
            id: "10003",
            contentText: "Thủ đô tq là?",
            type: 1,
            contentJSON: [
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
