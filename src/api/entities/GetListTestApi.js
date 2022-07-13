import BaseAPIConfig from "../base/BaseApiConfig";
const GetListTestApi = {};
const userID = JSON.parse(sessionStorage.getItem("info"))?.id || "";
GetListTestApi.getTest = BaseAPIConfig.get(
  "/api/test/getTestsAssignToMe?myId=" + userID,
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
  }
);

export default GetListTestApi;