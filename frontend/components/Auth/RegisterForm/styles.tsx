import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 43px;
  background: #ffffff;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  .ant-select-selector {
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
    border-radius: 10px !important;
    height: 45px !important;
  }
  .ant-select-selection-item {
    margin-left: 10px;
    line-height: 42px !important;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
  }
`;
export const Title = styled.h3`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 34px;
  margin-top: 10px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
