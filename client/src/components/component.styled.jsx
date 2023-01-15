import styled from "styled-components";

export const ComponentBox = styled.div`
  background: rgba(46, 46, 46, 0.3);
  backdrop-filter: blur(3.5px);
  border-radius: 5px;
  padding: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const TransactionsListBox = styled.div`
  height: 100%;
  margin-top: 24px;
  flex-grow: 1;
  overflow: hidden;
  overflow-x: auto;
`;

export const ComponentBoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-radius: 5px;
  color: #fff;
`;

export const ComponentBoxBody = styled.div`
  padding: 10px;
  margin-bottom: 16px;
  font-size: 22px;
  font-weight: 600;
  color: #fff;
  background-color: #0000005f;
  letter-spacing: 2px;
`;

export const HeaderTitle = styled.p`
  font-size: 24px;
  letter-spacing: 2px;
  padding: 5px;
  marginbottom: 0px;
`;

export const InnerTitle = styled.p`
  font-size: 20px;
  margin-bottom: 0px;
  padding: 4px;
`;
