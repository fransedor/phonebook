import React from 'react'
import PaginationContainer, { StyledBeforeIcon, StyledNextIcon } from './index.styles'

const Pagination = () => {
	return (
		<PaginationContainer>
			<StyledBeforeIcon />
			<StyledNextIcon />
		</PaginationContainer>
	)
}

export default Pagination