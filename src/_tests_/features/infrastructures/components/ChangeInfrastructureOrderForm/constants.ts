import { ChangeInfrastructureOrderFormProps } from 'features/infrastructures/components/ChangeInfrastructureOrderForm'

import infrastructuresFixtures from '_tests_/fixtures/infrastructures'

export const infrastructureOrderFormListItem = infrastructuresFixtures.infrastructureOrderForm()

export const props: ChangeInfrastructureOrderFormProps = {
  data: infrastructureOrderFormListItem,
  infrastructureWorkTypes: [],
  managerIsCurrentUser: true,

  canUploadFile: true,
  onUploadFile: jest.fn(),

  canDeleteFile: true,
  isDeleting: true,
  onDeleteFile: jest.fn(),
}

export enum TestIdsEnum {
  ChangeInfrastructureOrderFormContainer = 'change-infrastructure-order-form-container',
}
