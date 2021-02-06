import styled from 'styled-components';

export const Wrapper = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 20px 30px;
  margin-bottom: 24px;
`;

export const Inner = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const TextArea = styled.textarea`
  margin-right: 20px;
  width: 100%;
  font-size: 18px;
  resize: vertical; 
  max-height: 240px;
  min-height: 100px;
  border-radius: 20px;
  outline: none;
  /* border: 1px solid rgba(0, 0, 0, 0.2); */
  border: none;
  padding: 20px 35px;
  color: rgba(0, 0, 0, 0.7);
  background-color: #fff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
  ::placeholder {
    color: #000;
    font-size: 18px;
    font-family: Play;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 16px;
    color: rgba(0, 0, 0, 0.4);
  } 
`;