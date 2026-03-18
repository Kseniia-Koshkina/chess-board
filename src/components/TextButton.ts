import { styled } from "styled-components";

export const TextButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  padding: 0;
  font: inherit;
  text-decoration: underline;
`;