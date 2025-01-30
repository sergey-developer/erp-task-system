import pick from 'lodash/pick'

import { ExecuteInventorizationReviseTabProps } from 'features/warehouse/components/ExecuteInventorizationReviseTab'

import warehouseFixtures from '_tests_/fixtures/warehouse'

export const props: ExecuteInventorizationReviseTabProps = {
  inventorization: pick(
    warehouseFixtures.inventorization(),
    'id',
    'warehouses',
    'status',
    'executor',
  ),
}

export enum TestIdsEnum {
  Container = 'execute-inventorization-revise-tab',
  CheckByExcelUpload = 'check-by-excel-upload',
  CheckInventorizationEquipmentsTemplateErrorsContainer = 'check-inventorization-equipments-template-errors',
  CheckInventorizationEquipmentsErrorsContainer = 'check-inventorization-equipments-errors',
}
