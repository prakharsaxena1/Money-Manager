import React from "react";
import {
  ComponentBox,
  ComponentBoxBody,
  ComponentBoxHeader,
  InnerTitle,
} from "../../component.styled";
import { AiOutlineUser } from "react-icons/ai";
const Friends = ({ data = [] }) => {
  return (
    <ComponentBox>
      <ComponentBoxHeader>
        <h3>Friends</h3>
      </ComponentBoxHeader>
      <div
        style={{
          heihgt: "800px",
          overflow: "hidden",
          overflowY: "auto",
        }}
      >
        {data.map((friend, i) => (
          <ComponentBoxBody key={i}>
            <div className="d-flex align-items-center">
              <div
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                  marginRight: "16px",
                  padding: "16px",
                  borderRadius: "16px",
                }}
              >
                <AiOutlineUser
                  style={{
                    fontSize: "40px",
                  }}
                />
              </div>
              <div>
                <InnerTitle>{friend.username}</InnerTitle>
                <InnerTitle>Owes: {friend.owes || 0}</InnerTitle>
              </div>
            </div>
          </ComponentBoxBody>
        ))}
      </div>
    </ComponentBox>
  );
};

export default Friends;
