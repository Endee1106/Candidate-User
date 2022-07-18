import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextareaAutosize,
  RadioGroup,
  Radio,
} from "@mui/material";
import React, { useState } from "react";

const Section = ({ section, handleAnswerQs, testResult }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="section">
      <div className="section-header">
        <h3>{section.sectionName}:</h3>
        <span
          className="open-btn"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? "-" : "+"}
        </span>
      </div>
      {isOpen && (
        <div className="section-body">
          {section.questionSections.map((qst, key) => (
            <div className="question" key={key}>
              <h4>
                <span style={{ marginRight: "12px" }}>{key + 1}:</span>
                {qst.question.contentText}
              </h4>
              <div>
                {qst.question.type === 1 && (
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name={qst.question.id}
                    onChange={(e) => {
                      handleAnswerQs(key, e.target.value);
                    }}
                  >
                    {qst.question?.contentListObject?.map((content, k) => (
                      <FormControlLabel
                        key={k}
                        value={content.key}
                        control={<Radio />}
                        label={content.key}
                      />
                    ))}
                  </RadioGroup>
                )}
                {qst.question.type === 2 && (
                  <FormGroup>
                    {qst.question?.contentListObject?.map((content, k) => (
                      <FormControlLabel
                        key={k}
                        value={content.key}
                        control={
                          <Checkbox
                            onChange={(e) => {
                              let currentValue =
                                testResult.questionSections[key].answerText ||
                                [];
                              let newValue = [];
                              if (e.target.checked) {
                                newValue = [...currentValue, e.target.value];
                              } else {
                                newValue = currentValue.filter(
                                  (item) => item !== e.target.value
                                );
                              }
                              handleAnswerQs(key, newValue);
                            }}
                          />
                        }
                        label={content.key}
                      />
                    ))}
                  </FormGroup>
                )}
                {qst.question.type === 3 && (
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <TextareaAutosize
                          minRows={5}
                          onChange={(e) => {
                            handleAnswerQs(key, e.target.value);
                          }}
                          style={{
                            width: "100%",
                            textIndent: "15px",
                            padding: "12px 0",
                            textSizeAdjust: "18px",
                            marginLeft: "15px",
                          }}
                        />
                      }
                      // label={content.key}
                    />
                  </FormGroup>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Section;
