import React from 'react'
import styled from 'styled-components'

interface StopButtonProps {
	text: string
}

const StyledButton = styled.button`
	margin-top: 25px;
	color: var(--Beige, #fef2e7);
	text-align: center;
	/* Regular, 16 */
	font-family: Raleway;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	letter-spacing: 1.6px;
	background-color: transparent;
	border: none;
	outline: none;
`

export const StopButton = ({ text }: StopButtonProps) => {
	return <StyledButton>{text}</StyledButton>
}

export default StopButton
