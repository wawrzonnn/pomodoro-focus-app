import { keyframes } from 'styled-components'

export const orbitAnimation1 = keyframes`
0% { transform: translate(0, 0); }
25% { transform: translate(25px, 15px); }
50% { transform: translate(50px, 0); }
75% { transform: translate(25px, -15px); }
100% { transform: translate(0, 0); }
`

export const orbitAnimation2 = keyframes`
0% { transform: translate(0, 0); }
  25% { transform: translate(-25px, -15px); }
  50% { transform: translate(-50px, 0); }
  75% { transform: translate(-25px, 15px); }
    100% { transform: translate(0, 0); }
`

export const orbitAnimation3 = keyframes`
0% { transform: translate(0, 0); }
  25% { transform: translate(35px, 5px); }
  50% { transform: translate(50px, 25px); }
  75% { transform: translate(35px, 30px); }
    100% { transform: translate(0, 0); }
`

export const orbitAnimation4 = keyframes`
0% { transform: translate(0, 0); }
  25% { transform: translate(-35px, 0); }
  50% { transform: translate(-50px, 35px); }
  75% { transform: translate(-35px, -25px); }
    100% { transform: translate(0, 0); }
`

export const orbitAnimation5 = keyframes`
0% { transform: translate(0, 0); }
  25% { transform: translate(35px, -25px); }
  50% { transform: translate(-35px, -50px); }
  75% { transform: translate(-50px, 15px); }
100% { transform: translate(0, 0); }
`