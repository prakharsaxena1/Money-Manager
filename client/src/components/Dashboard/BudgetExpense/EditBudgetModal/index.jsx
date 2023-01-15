import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { InnerTitle } from "../../../component.styled";

const EditBudgetModal = ({ show, handleClose, updateBudget }) => {
  const [budget, setBudget] = useState();
  const handleUpdateBudget = (e) => {
    setBudget(e.target.value);
  };
  const onUpdateAction = () => {
    updateBudget({
      budget,
    });
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit your budget</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-around m-auto mb-3">
          <InnerTitle style={{ width: "25%" }}>Amount: </InnerTitle>
          <input
            className="w-75"
            type="number"
            name="amount"
            onChange={handleUpdateBudget}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onUpdateAction}>
          Save budget
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditBudgetModal;
