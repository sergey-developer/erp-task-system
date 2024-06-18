import { screen } from '@testing-library/react'

const getContainer = () => screen.getByTestId('create-equipment-technical-examination-modal')
const findContainer = () => screen.findByTestId('create-equipment-technical-examination-modal')

export const testUtils = {
  getContainer,
  findContainer,
}

test.todo('CreateEquipmentTechnicalExaminationModal')
