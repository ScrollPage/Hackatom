import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: rgba(204, 235, 255, 0.2);
  border-radius: 20px;
  padding: 14px;
  display: flex;
  &:hover {
    background-color: rgba(204, 235, 255, 0.5);
  }
  transition: background-color .3s ease;
  margin-bottom: 20px;
`;

export const Title = styled.h3`
  > a {
    font-family: Play;
    font-style: normal;
    font-weight: normal;
    font-size: 32px;
    line-height: 37px;
    color: #000;
    &:hover {
      color: ${({ theme }) => theme.blue};
    }
  }
`;
export const Label = styled.p`
  font-family: Play;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  margin: 6px 0;
`;
export const Main = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-left: 20px;
`;
