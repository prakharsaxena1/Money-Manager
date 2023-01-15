import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import moment from "moment";
import {
  ComponentBoxHeader,
  HeaderTitle,
  TransactionsListBox,
} from "../component.styled";
// Modals
import FilterModal from "./Modals/filterModal";
import AppBox from "../AppBox";
import { getUserTransactions } from "../../services/user.service";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const transformTransactionDataHistory = (data) => {
  const transactions = data.map((transaction) => ({
    myShare: Math.round(
      transaction.amount / (transaction.divideAmong.length + 1)
    ),
    payTo: transaction.paidBy.username,
    category: transaction.category,
    paidAt: transaction.updatedAt,
  }));
  return transactions;
};

const Transactions = ({ data = [] }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  useEffect(() => {
    getUserTransactions().then((res) => {
      const { data } = res.data;
      setTransactionData(transformTransactionDataHistory(data.allUser));
    });
  }, []);
  if (!Cookies.get("authorization")) {
    return <Navigate to="/login" />;
  }
  return (
    <AppBox>
      <Container
        style={{
          background: "rgba(46, 46, 46, 0.3)",
          backdropFilter: "blur(3.5px)",
          borderRadius: "5px",
          padding: "16px",
          overflow: "hidden",
          marginTop: "10px",
        }}
      >
        <ComponentBoxHeader>
          <HeaderTitle>Transactions list</HeaderTitle>
          <div
            className="d-flex justify-content-around"
            style={{ width: "150px" }}
          >
            <Button variant="dark" onClick={() => setShowFilterModal(true)}>
              Filter
            </Button>
          </div>
        </ComponentBoxHeader>
        <TransactionsListBox>
          {/* transaction list item */}
          {transactionData.length !== 0 ? (
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Amount</th>
                  <th>Paid to</th>
                  <th>Category</th>
                  <th>Date of transaction</th>
                </tr>
              </thead>
              <tbody>
                {transactionData.map((transaction, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{transaction.myShare}</td>
                    <td>{transaction.payTo}</td>
                    <td>{transaction.category}</td>
                    <td>
                      {moment(transaction.paidAt).format("MMM Do YYYY, h:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <h1 className="text-center">No record found</h1>
          )}
        </TransactionsListBox>
      </Container>
      <FilterModal
        show={showFilterModal}
        handleClose={() => setShowFilterModal(false)}
      />
    </AppBox>
  );
};

export default Transactions;
