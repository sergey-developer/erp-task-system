import { ExecuteInventorizationReviseTabProps } from 'features/inventorizations/components/ExecuteInventorizationReviseTab'
import pick from 'lodash/pick'

import inventorizationsFixtures from '_tests_/fixtures/inventorizations'

export const props: ExecuteInventorizationReviseTabProps = {
  inventorization: pick(
    inventorizationsFixtures.inventorizationDetail(),
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
