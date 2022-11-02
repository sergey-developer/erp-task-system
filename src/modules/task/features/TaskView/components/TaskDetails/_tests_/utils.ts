import { screen } from '@testing-library/react'

export const getTaskDetails = () => screen.getByTestId('task-details')
export const findTaskDetails = async () => screen.findByTestId('task-details')
