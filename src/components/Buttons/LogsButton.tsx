import React from 'react'
import styled from 'styled-components'

interface LogsButtonProps {
	text: string
}

const StyledButton = styled.button`
	margin-top: 20px;
	color: var(--Beige, #fef2e7);
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
    padding-bottom: 20px;
`

export const LogsButton = ({ text }: LogsButtonProps) => {
	return <StyledButton>{text}</StyledButton>
}

export default LogsButton
