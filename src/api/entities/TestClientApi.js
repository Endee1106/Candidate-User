import BaseAPIConfig from "../base/BaseApiConfig";
const TestClientApi = {};
const userID = JSON.parse(sessionStorage.getItem("info"))?.id || "";
TestClientApi.getTests = BaseAPIConfig.get(
  "/api/test/getTestsAssignToMe?myId=" + userID,
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
  }
);

TestClientApi.getTest = (testId)=>{
  return BaseAPIConfig.get(
    "/api/test/candidate/" + testId,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      },
    }
  );
}



export default TestClientApi;
