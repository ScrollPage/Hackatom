import styled from 'styled-components'

export const Wrapper = styled.div`
  .ant-btn {
    margin-right: 10px;
    height: 50px;
    width: 50px;
    border-radius: 20px;
  }
`;
export const Inner = styled.div`
  display: flex;
  align-items: center;
`;
export const Button = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  margin-left: 10px;
  margin-right: 10px;
  > img {
    max-height: 100%;
    cursor: pointer;
  }
`;