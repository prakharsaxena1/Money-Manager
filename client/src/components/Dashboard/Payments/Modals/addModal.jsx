import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { InnerTitle } from "../../../component.styled";
import Select from "react-select";
import { addTransaction } from "../../../../services/user.service";

const getFriends = (friendsData) => {
  return friendsData.map((friend) => ({
    label: friend.username,
    value: friend._id,
  }));
};

const AddModal = ({ show, handleClose, data = [] }) => {
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const [divideAmong, setDivideAmong] = useState([]);
  const [settledBy, setSettledBy] = useState([]);
  const onAddAction = () => {
    addTransaction({
      amount,
      message,
      category,
      divideAmong,
      settledBy,
    });
    handleClose();
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption.value);
  };
  const handleDivideAmongChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setDivideAmong(values);
  };
  const handleSettledByChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setSettledBy(values);
  };
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add a transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* amount */}
        <div className="d-flex justify-content-around m-auto mb-3">
          <InnerTitle style={{ width: "25%" }}>Amount: </InnerTitle>
          <input
            className="w-75"
            type="number"
            name="amount"
            onChange={handleAmountChange}
          />
        </div>
        {/* category */}
        <div className="d-flex justify-content-around m-auto mb-3">
          <InnerTitle style={{ width: "25%" }}>Category: </InnerTitle>
          <Select
            className="w-75"
            options={[
              { label: "Food", value: "food" },
              { label: "Drinks", value: "drink" },
              { label: "Entertainment", value: "entertainment" },
              { label: "Other", value: "other" },
            ]}
            onChange={handleCategoryChange}
          />
        </div>
        {/* message */}
        <div className="d-flex justify-content-around m-auto mb-3">
          <InnerTitle style={{ width: "25%" }}>Message: </InnerTitle>
          <input
            className="w-75"
            type="text"
            name="message"
            onChange={handleMessageChange}
          />
        </div>
        {/* divideAmong */}
        <div className="d-flex justify-content-around m-auto mb-3">
          <InnerTitle style={{ width: "25%" }}>Shared by: </InnerTitle>
          <Select
            className="w-75"
            options={getFriends(data)}
            isMulti={true}
            onChange={handleDivideAmongChange}
          />
        </div>
        {/* settledBy */}
        <div className="d-flex justify-content-around m-auto mb-3">
          <InnerTitle style={{ width: "25%" }}>Settled by: </InnerTitle>
          <Select
            options={getFriends(data)}
            className="w-75"
            isMulti={true}
            onChange={handleSettledByChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onAddAction}>
          Add transaction
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModal;
