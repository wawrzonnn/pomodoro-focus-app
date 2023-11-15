import React from 'react'
import styled from 'styled-components'

interface StartButtonProps {
	text: string
}

const StyledButton = styled.button`
	margin-top: 210px;
	color: var(--Beige, #fef2e7);
	text-align: center;
	font-family: Raleway;
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	letter-spacing: 1.6px;
	background-color: transparent;
	border: none;
	outline: none;
`

export const StartButton = ({ text }: StartButtonProps) => {
	return <StyledButton>{text}</StyledButton>
}

export default StartButton
