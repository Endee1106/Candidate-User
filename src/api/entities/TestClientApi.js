import BaseAPIConfig from "../base/BaseApiConfig";
const TestClientApi = {};
const userID = JSON.parse(sessionStorage.getItem("info"))?.id || "";
TestClientApi.getTest = BaseAPIConfig.get(
  "/api/test/getTestsAssignToMe?myId=" + userID,
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
  }
);

export default TestClientApi;
