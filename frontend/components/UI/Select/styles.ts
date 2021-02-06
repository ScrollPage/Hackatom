import styled from 'styled-components';

export const Wrapper = styled.div<{ width?: string }>`
  width: ${({ width }) => width ? width : '300px'};
  margin-bottom: 21px;
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