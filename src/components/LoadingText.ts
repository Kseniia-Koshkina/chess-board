import styled from "styled-components";

export const LoadingText = styled.p`
	&::after {
    content: "...";
    display: inline-block;
    width: 3ch; /* reserve space for 3 dots */
    text-align: left;
    overflow: hidden;
    vertical-align: bottom;
    animation: dots 1.5s steps(4, end) infinite;
  }

  @keyframes dots {
    0%   { content: ""; }
    25%  { content: "."; }
    50%  { content: ".."; }
    75%  { content: "..."; }
    100% { content: ""; }
  }
`;