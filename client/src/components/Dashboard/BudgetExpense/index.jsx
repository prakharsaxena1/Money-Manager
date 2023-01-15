import React, { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { ComponentBox, HeaderTitle, InnerTitle } from "../../component.styled";
import EditBudgetModal from "./EditBudgetModal";

const BudgetExpense = ({ data, updateBudget }) => {
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  return (
    <>
      <ComponentBox
        className="d-flex flex-column justify-content-between"
        style={{ height: "260px", marginBottom: "16px", color: "#fff" }}
      >
        <HeaderTitle style={{ backgroundColor: "#000" }}>Budget</HeaderTitle>
        {/* Info box */}
        <div className="d-flex flex-column justify-content-between flex-grow-1">
          <Stack direction="horizontal" gap={3}>
            <InnerTitle>Total:</InnerTitle>
            <InnerTitle>{data.budget}</InnerTitle>
            <Button
              variant="dark"
              size="sm"
              onClick={() => setShowBudgetModal(true)}
            >
              Edit
            </Button>
          </Stack>
          <Stack direction="horizontal" gap={3}>
            <InnerTitle>Budget left: </InnerTitle>
            <InnerTitle>{data.budget - data.expense}</InnerTitle>
          </Stack>
          <Stack direction="horizontal" gap={3}>
            <InnerTitle>Expenses: </InnerTitle>
            <InnerTitle>{data.expense}</InnerTitle>
          </Stack>
        </div>
      </ComponentBox>
      <EditBudgetModal
        show={showBudgetModal}
        handleClose={() => setShowBudgetModal(false)}
        updateBudget={updateBudget}
      />
    </>
  );
};

export default BudgetExpense;
