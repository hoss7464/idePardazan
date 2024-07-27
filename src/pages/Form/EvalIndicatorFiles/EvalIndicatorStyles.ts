import styled from 'styled-components';
import { IoPerson } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import { FiPlus } from 'react-icons/fi';
import { FiMinus } from 'react-icons/fi';

export const GuyehIcon = styled(IoPerson)`
  width: 20px;
  height: 20px;
  color: #9061f9;
`;

export const ModalTopicCloseBtn = styled(IoClose)`
  width: 24px;
  height: 24px;
`;

export const IncrementDecrementWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
`;
export const NumberIncrementWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: #cffafe;
`;
export const NumberIncrement = styled(FiPlus)`
  color: #8cb2f3;
  width: 24px;
  height: 24px;
`;
export const NumberDecrementWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: #cffafe;
`;
export const NumberDecrement = styled(FiMinus)`
  color: #8cb2f3;
  width: 24px;
  height: 24px;
`;

export const FieldWrapper1 = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
background-color: khaki;
`
