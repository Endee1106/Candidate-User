import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const VerifyPopup = ({ open, handleClose, link, testName }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Xác nhận vào làm bài thi {testName}
        </Typography>
        <div className="center" style={{ marginTop: "20px" }}>
          <Button
            variant="contained"
            onClick={handleClose}
            color="error"
            style={{ marginRight: "20px" }}
          >
            Hủy
          </Button>
          <Link to={link}>
            <Button variant="contained" onClick={handleClose} color="primary">
              Đồng ý
            </Button>
          </Link>
        </div>
      </Box>
    </Modal>
  );
};

export default VerifyPopup;
