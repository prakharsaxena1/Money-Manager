import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import moment from "moment";
import {
  ComponentBox,
  ComponentBoxHeader,
  HeaderTitle,
} from "../../component.styled";
import AddModal from "./Modals/addModal";
import styled from "styled-components";
import {
  getUserTransactions,
  updateTransaction,
} from "../../../services/user.service";

const PaymentsListBox = styled.div`
  height: 100%;
  margin-top: 24px;
  flex-grow: 1;
  overflow: hidden;
  overflow-y: auto;
`;

const Payments = ({ friendsData = [] }) => {
  const [showAddModal, setShowAddModal] = useState();
  const [paymentData, setPaymentData] = useState([]);
  const paymentMade = (id) => {
    updateTransaction(id).then((res) => {
      setPaymentData((prev) => {
        return prev.filter((transaction) => transaction._id !== id) || [];
      });
    });
  };
  useEffect(() => {
    getUserTransactions().then((res) => {
      const { data } = res.data;
      setPaymentData(data.pending);
    });
  }, []);

  return (
    <>
      <ComponentBox>
        <ComponentBoxHeader className="align-items-baseline">
          <HeaderTitle className="text-light">Payments</HeaderTitle>
          <div
            className="d-flex justify-content-around"
            style={{ width: "100px" }}
          >
            <Button variant="dark" onClick={() => setShowAddModal(true)}>
              Add
            </Button>
          </div>
        </ComponentBoxHeader>
        {/* Body payments */}
        <PaymentsListBox>
          {paymentData.length !== 0 ? (
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Pay to</th>
                  <th>Category</th>
                  <th>Message</th>
                  <th>My Share</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paymentData.map((payment, i) => (
                  <tr className="align-baseline" key={i}>
                    <td>{i + 1}</td>
                    <td>
                      {moment(payment.createdAt).format("MMM Do YYYY, h:mm A")}
                    </td>
                    <td>{payment.amount}</td>
                    <td>{payment.paidBy.username}</td>
                    <td>{payment.category}</td>
                    <td>{payment.message}</td>
                    <td>
                      {Math.round(
                        payment.amount / (payment.divideAmong.length + 1)
                      )}
                    </td>
                    <td>
                      <Button
                        className="w-100"
                        onClick={() => paymentMade(payment._id)}
                      >
                        Pay
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <h1 className="text-center">No pending payments</h1>
          )}
        </PaymentsListBox>
      </ComponentBox>
      <AddModal
        data={friendsData}
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
      />
    </>
  );
};

export default Payments;
