import React, { useEffect, useState } from "react";
import AppBox from "../AppBox";
import BudgetExpence from "./BudgetExpense";
import Friends from "./Friends";
import Payments from "./Payments";

import { Stack } from "react-bootstrap";
import { getUserInfo } from "../../services/auth.service";
import { getFriendsOwes, updateBudgetInfo } from "../../services/user.service";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const initialUserData = {
  username: "USERNAME",
  friends: [],
  budget: 0,
  expense: 0,
};

const initialBudgetData = {
  budget: 0,
  expense: 0,
  budgetBalance: 0,
};

const initialFriendsData = [
  {
    username: "",
  },
];

const Dashboard = () => {
  const [userData, setUserData] = useState(initialUserData);
  const [friendsData, setFriendsData] = useState(initialFriendsData);
  const [budgetData, setBudgetData] = useState(initialBudgetData);
  // Get user info
  useEffect(() => {
    getUserInfo().then((res) => {
      const { data } = res.data;
      setBudgetData({
        budget: data.budget,
        expense: data.expense,
        budgetBalance: data.budget - data.expense,
      });
      setUserData(data);
    });
    getFriendsOwes().then((res) => {
      const { data } = res.data;
      setFriendsData(data);
    });
  }, []);
  if (!Cookies.get("authorization")) {
    return <Navigate to="/login" />;
  }
  const onUpdateBudgetAction = (budgetUpdate) => {
    updateBudgetInfo(budgetUpdate).then((res) => {
      const { data } = res.data;
      setBudgetData(data);
    });
  };
  return (
    <AppBox username={userData.username}>
      <Stack
        gap={3}
        direction="horizontal"
        style={{
          padding: "16px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "75vw",
            height: "calc( 100vh - 90px )",
          }}
        >
          <Payments friendsData={friendsData || []} />
        </div>
        <div
          style={{
            flexGrow: 1,
            height: "calc( 100vh - 90px )",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <BudgetExpence
            data={budgetData}
            updateBudget={onUpdateBudgetAction}
          />
          <Friends data={friendsData} />
        </div>
      </Stack>
    </AppBox>
  );
};

export default Dashboard;
