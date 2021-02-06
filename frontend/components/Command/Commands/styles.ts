import styled from 'styled-components';
import { Wrapper as CommandItem } from '../CommandItem/styles';

export const Wrapper = styled.div`
  ${CommandItem} {
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;