import { keyframes } from "styled-components";

export const fadeIn = keyframes`
  from { opacity: 0.5; }
  to { opacity: 1; }
`

export const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0.5; }
`
export const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-100%);
  }
`;

export const expand = keyframes`
  from {
    opacity: 0;
    transform: scaleY(0);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
`;

export const collapse = keyframes`
  from {
    opacity: 1;
    transform: scaleY(1);
  }
  to {
    opacity: 0;
    transform: scaleY(0);
  }
`;
