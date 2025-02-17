import { ExecuteInventorizationReviseTabProps } from 'features/inventorizations/components/ExecuteInventorizationReviseTab'
import pick from 'lodash/pick'

import warehousesFixtures from '_tests_/fixtures/warehouse'

export const props: ExecuteInventorizationReviseTabProps = {
  inventorization: pick(
    warehousesFixtures.inventorization(),
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
