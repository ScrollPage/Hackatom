import styled from "styled-components";

export const DocInput = styled.input`
  margin-bottom: 21px;
  width: 300px;
`

export const Wrapper = styled.div`
  background: #ffffff;
  .ant-select-selector, .ant-select-selection-item { 
    border-radius: 10px !important; 
    height: auto !important;
  }
  .ant-select-selection-placeholder { 
    font-family: Montserrat !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 12px !important;
    line-height: 15px !important;
    opacity: 0.3 !important;
    margin-left: 12px !important;
    color: #000 !important;
  }
  .ant-select-selection-item-content {
    white-space: pre-wrap !important;
  }
`;
export const Title = styled.h3`
  text-align: center;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 34px;
`;

export const Inner = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
