import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import { getUserTransactionsQuery } from "../../../services/user.service";
import { InnerTitle } from "../../component.styled";

const FilterModal = ({ show, handleClose, setTransactionData }) => {
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption.value);
  };
  const handleChangeStart = (event) => {
    setStartDate(event.target.value);
  };
  const handleChangeEnd = (event) => {
    setEndDate(event.target.value);
  };

  const onFilterAction = () => {
    getUserTransactionsQuery({
      category: category === "" ? "food" : category,
      startDate: startDate === "" ? new Date() : startDate,
      endDate: endDate === "" ? new Date() : endDate,
    }).then((res) => {
      const { data } = res.data;
      setTransactionData(data.allUser);
    });
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Date filter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* From */}
        <div className="d-flex justify-content-around m-auto mb-3">
          <InnerTitle style={{ width: "25%" }}>From: </InnerTitle>
          <input
            type="date"
            onChange={handleChangeStart}
            style={{ width: "75%" }}
          />
        </div>
        {/* To */}
        <div className="d-flex justify-content-around m-auto mb-3">
          <InnerTitle style={{ width: "25%" }}>To: </InnerTitle>
          <input
            type="date"
            onChange={handleChangeEnd}
            style={{ width: "75%" }}
          />
        </div>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onFilterAction}>
          Apply filter
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;
