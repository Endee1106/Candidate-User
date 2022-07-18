import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import TestClientApi from "../../api/entities/TestClientApi";
import Section from "./Section";
import "./testscreen.css";
import { useSearchParams } from "react-router-dom";
import cleanDeep from 'clean-deep'

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

  const handleAnswerQs = (sectionIndex, questionIndex, value, type) => {
    try {
      let ts = [...testResult];
      if (type === 3)
        ts[sectionIndex].questionSections[questionIndex].answerText = value;
      else {
        const contentListObject =
          ts[sectionIndex].questionSections[questionIndex].question
            .contentListObject;
        ts[sectionIndex].questionSections[questionIndex].question.contentListObject = convertValue(
          contentListObject,
          value.key,
          value.value,
          type
        );
      }

      ts[sectionIndex].questionSections[questionIndex].id =  null;
      ts[sectionIndex].questionSections[questionIndex].questionId =  null;
      ts[sectionIndex].questionSections[questionIndex].sectionId =  null;
      ts[sectionIndex].questionSections[questionIndex].question.questionSections = null;
      ts[sectionIndex].testId = null;
      ts[sectionIndex].id = null;
      setTestResult(ts);
    } catch (error) {
      console.log(error);
    }
  };

  const convertValue = (contentListObject, key, value, type) => {
    return contentListObject.map((item) => {
      if (item.key === key) {
        return {
          key: item.key,
          value: value,
        };
      } else {
        if (type === 1) {
          const newItem = item;
          newItem.value = false;
          return newItem;
        } else {
          return item;
        }
      }
    });
  };

  const removeEmpty = (obj) => {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([_, v]) => v != null)
        .map(([k, v]) => [k, v === Object(v) ? removeEmpty(v) : v])
    );
  }

  const handleSubmitTest = async () => {
    try {
      setIsLoading(true);
      const userID = JSON.parse(sessionStorage.getItem("info"))?.id || "";
      const answer = {
        accountId: userID,
        testAnswer: {
          testCode: searchParams.get("testCode"),
          testName: searchParams.get("testName") || "Thi thử",
          id: currentTest.id,
          sections: testResult,
        },
      };
      
      let _answer = cleanDeep(answer);

      let rs = await TestClientApi.submitTest(_answer);
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

let a =
{
  "accountId": "be441d4c-2270-4d9a-276f-08da6799b062",
  "testAnswer": {
      "testCode": "TC02",
      "testName": "Bài thi thử",
      "sections": [
        {
          "sectionName": "Phần đuôi",
          "questionSections": [
            {
              "question": {
                "type": 3,
                "contentText": "How are you?",
                "answerText": "im 5",
                "id": "40bc088a-4720-49bc-6f45-08da685a22b1"
              }
            },
            {
              "question": {
                "type": 1,
                "contentText": "Thủ đô của Việt Nam?",
                "contentListObject": [
                  {
                    "key": "Hà Tĩnh",
                    "value": true
                  },
                  {
                    "key": "Hà Nội",
                    "value": false
                  },
                  {
                    "key": "Hà Nam",
                    "value": false
                  }
                ],
                "id": "934e9ca4-47d7-4bdd-6f47-08da685a22b1"
              }
            }
          ]
        },
        {
          "sectionName": "Phần đầu",
          "questionSections": [
            {
              "question": {
                "type": 2,
                "contentText": "Việt Nam nằm ở đâu?",
                "contentListObject": [
                  {
                    "key": "Đông Dương",
                    "value": true
                  },
                  {
                    "key": "Châu Phi",
                    "value": false
                  },
                  {
                    "key": "Châu Âu",
                    "value": false
                  },
                  {
                    "key": "Châu Á",
                    "value": true
                  }
                ],
                "id": "5a17a77e-97e3-49b3-6f4a-08da685a22b1"
              }
            },
            {
              "question": {
                "type": 3,
                "contentText": "Giải thích hiện tượng khúc xạ ánh sáng",
                "answerText": "ko biết",
                "id": "a7da3a20-1509-4e5c-6f44-08da685a22b1"
              }
            }
          ]
        }
      ],
      "id": "97898d3d-0050-4ba3-30fd-08da68c9cea4"
    },
  "soCauDung": 0,
  "soCauSai": 0,
  "soCauTuLuan": 0
}
