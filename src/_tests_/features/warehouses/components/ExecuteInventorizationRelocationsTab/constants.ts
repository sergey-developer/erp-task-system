import { ExecuteInventorizationRelocationsTabProps } from 'features/inventorizations/components/ExecuteInventorizationRelocationsTab/index'
import pick from 'lodash/pick'

import warehouseFixtures from '_tests_/fixtures/warehouse/index'

export const props: ExecuteInventorizationRelocationsTabProps = {
  inventorization: pick(
    warehouseFixtures.inventorization(),
    'id',
    'executor',
    'status',
    'type',
    'deadlineAt',
    'createdAt',
    'createdBy',
    'warehouses',
  ),
}

export enum TestIdsEnum {
  ExecuteInventorizationRelocationsTab = 'execute-inventorization-relocations-tab',
}
