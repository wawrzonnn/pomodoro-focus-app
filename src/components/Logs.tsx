import React from 'react'
import styled from 'styled-components'

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

export const LogsButton = () => {
	return <StyledButton>Show logs</StyledButton>
}

export default LogsButton
