import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import TestClientApi from "../../api/entities/TestClientApi";
import Section from "./Section";
import "./testscreen.css";
import { useSearchParams } from "react-router-dom";
import cleanDeep from "clean-deep";
import CircularProgress from "@mui/material/CircularProgress";
import ModalResult from "./ModalResult";
import { toast } from 'react-toastify';

const TestScreen = (props) => {
  const [lsTest, setLsTest] = useState([]);
  const [currentTest, setCurrentTest] = useState({});
  const [testResult, setTestResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [data, setData] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    TestClientApi.getTest(searchParams.get("id")).then((res) => {
      setCurrentTest(res.data.data);
      setTestResult(res.data.data.sections);
    });
    setIsLoading(false);
  }, []);

  const handleAnswerQs = (sectionIndex, questionIndex, value, type) => {
    try {
      let ts = [...testResult];
      console.log(type);
      if (type === 3) {
        console.log(value);
        ts[sectionIndex].questionSections[questionIndex].question.answerText = value;
      }
      else {
        const contentListObject =
          ts[sectionIndex].questionSections[questionIndex].question
            .contentListObject;
        ts[sectionIndex].questionSections[
          questionIndex
        ].question.contentListObject = convertValue(
          contentListObject,
          value.key,
          value.value,
          type
        );
      }

      ts[sectionIndex].questionSections[questionIndex].id = null;
      ts[sectionIndex].questionSections[questionIndex].questionId = null;
      ts[sectionIndex].questionSections[questionIndex].sectionId = null;
      ts[sectionIndex].questionSections[
        questionIndex
      ].question.questionSections = null;
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
  };

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

      console.log(JSON.stringify(_answer, null, 2));

      let rs = await TestClientApi.submitTest(_answer);
      if (rs.data.code == 2001 || rs.data.code == 2000) {
        setIsOpen(true);
        setData(rs.data.data);
        if (rs.data.code == 2001)
          toast.success("Gửi bài thi thành công");
        else
          toast.info("Đây là lần thi lại nên bài thi sẽ không được lưu lại!");
      } else {
        toast.error("Something wrong");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something wrong");
      console.log(error);
    }
  };

  return (
    <div>
      <ModalResult
        open={isOpen}
        data={data}
        handleClose={() => {
          setIsOpen(false);
        }}
      />
      <div
        className="card row"
        style={{
          margin: "12px 24px",
          height: "680px",
          overflow: "scroll",
        }}
      >
        <div className="test-form" style={{ width: "100%" }}>
          {isLoading ? (
            <div className="center" style={{ height: "100%" }}>
              <CircularProgress />
            </div>
          ) : (
            currentTest.id && (
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
                      handleAnswerQs={(questionId, value, type) => {
                        handleAnswerQs(key, questionId, value, type);
                      }}
                    />
                  ))}
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TestScreen;

