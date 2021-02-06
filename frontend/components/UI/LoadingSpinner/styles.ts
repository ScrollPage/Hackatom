import styled from 'styled-components';

export const SLoadingSpinner = styled.div<{ small?: boolean, white?: boolean }>`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  position: relative;
  width: ${({ small }) => small ? "20px" : "40px"};
  height: ${({ small }) => small ? "20px" : "40px"};
  margin: 0 auto;
  border-radius: 50%;
  border-top: 3px solid rgba(0, 0, 0, 0.1);
  border-right: 3px solid rgba(0, 0, 0, 0.1);
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
  border-left: 3px solid ${({ white }) => white ? "#fff" : "#000"};
  transform: translateZ(0);
  animation: spin 0.5s infinite linear;
`;