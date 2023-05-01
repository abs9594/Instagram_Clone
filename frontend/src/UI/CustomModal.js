import React from "react";
import { Box, Modal } from "@mui/material";
import PropTypes from "prop-types";

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

const CustomModal = (props) => {
    return (
        <Modal
            open={props.modalOpen}
            onClose={props.onModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {props.children}
            </Box>
        </Modal>
    );
};

CustomModal.propTypes = {
    modalOpen: PropTypes.bool,
    onModalClose: PropTypes.func,
    children: PropTypes.any
};

export default CustomModal;


