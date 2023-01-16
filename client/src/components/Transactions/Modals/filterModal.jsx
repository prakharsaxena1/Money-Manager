import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import { getUserTransactionsQuery } from "../../../services/user.service";
import { InnerTitle } from "../../component.styled";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterModal = ({ show, handleClose, setTransactionData }) => {
  const [category, setCategory] = useState("");
  const today = new Date();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [startDate, setStartDate] = useState(sevenDaysAgo);
  const [endDate, setEndDate] = useState(today);

  console.log({
    startDate,
    endDate,
    category,
  });
  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption.value);
  };

  const onFilterAction = () => {
    getUserTransactionsQuery({
      category: category,
      startDate:
        startDate === ""
          ? new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          : startDate,
      endDate: endDate === "" ? new Date() : endDate,
    }).then((res) => {
      const { data } = res.data;
      setTransactionData(data.filtered);
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
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        {/* To */}
        <div className="d-flex justify-content-around m-auto mb-3">
          <InnerTitle style={{ width: "25%" }}>To: </InnerTitle>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
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
