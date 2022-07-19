import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

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

const ModalResult = ({ open, handleClose, data }) => {
  console.log(data);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Kết quả
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Số câu đúng : {data.soCauDung}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Số câu sai : {data.soCauSai}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Số câu tự luận : {data.soCauTuLuan}
        </Typography>
        <div className="center" style={{marginTop: "20px"}}>
          <Button variant="contained" onClick={handleClose} color="primary">
            Hoàn thành
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalResult;
