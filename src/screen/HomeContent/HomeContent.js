import React from "react";
import "./HomeContent.css";

function HomeContent() {
  return (
    <div className="content">
      <div className="left-home">
        <h2>Quy định làm bài thi</h2>
        <li>
        You must use a functioning webcam and microphone
        </li>
        <li>
        No cell phones or other secondary devices in the room or test area
        </li>
        <li>
        Your desk/table must be clear or any materials except your test-taking device
        </li>
        <li>No one else can be in the room with you</li>
        <li>No talking </li>
        <li>The testing room must be well-lit and you must be clearly visible</li>
        <li>No dual screens/monitors</li>
        <li>Do not leave the camera </li>
        <li>No use of additional applications or internet</li>
        </div>
      <div className="home">
        <div className="home-img">
       <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
        </div>
        <div className="home-content">
          <div className="content1">
            <h2>Tầm nhìn CMC</h2>
            <p>Với Tình yêu và niềm Đam mê, Tập đoàn Công nghệ CMC không ngừng phấn đấu trở thành Tập đoàn hàng đầu khu vực trong lĩnh vực Công nghệ Thông tin và Viễn thông bằng phương pháp không ngừng sáng tạo và đổi mới trong nghiên cứu ứng dụng các giải pháp công nghệ cao; luôn hướng đến sự chuyên nghiệp, hoàn thiện trong từng sản phẩm và dịch vụ, nhằm góp phần đưa Việt Nam trở thành quốc gia mạnh về công nghệ thông tin.</p>
          </div>
          <div className="content2">
            <h2>Sứ mệnh của CMC</h2>
            <p>CMC cam kết sẽ đem lại sự hài lòng cho khách hàng, lợi nhuận cho các cổ đông và cuộc sống phong phú về cả vật chất lẫn tinh thần cho toàn thể cán bộ công nhân viên góp phần đưa xã hội hướng tới kỷ nguyên số.</p>
          </div>
          <div className="content3">
            <h2>Giá trị cốt lõi</h2>
            <li>Sáng tạo</li>
            <li>Đồng đội</li>
            <li>Chuyên nghiệp</li>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeContent;
