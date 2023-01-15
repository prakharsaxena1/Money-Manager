import React from "react";
import { Button, Modal } from "react-bootstrap";
import { InnerTitle } from "../../component.styled";

const FilterModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Date filter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* From */}
        <div className="d-flex justify-content-around w-75 m-auto">
          <InnerTitle style={{ width: "20%" }}>From: </InnerTitle>
          <input
            type="date"
            id="fromDate"
            name="fromDate"
            style={{ width: "70%" }}
          />
        </div>
        {/* To */}
        <div className="d-flex justify-content-around w-75 m-auto">
          <InnerTitle style={{ width: "20%" }}>To: </InnerTitle>
          <input
            type="date"
            id="toDate"
            name="toDate"
            style={{ width: "70%" }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">Apply filter</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;
