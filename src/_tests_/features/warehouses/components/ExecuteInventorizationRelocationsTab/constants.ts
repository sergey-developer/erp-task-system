import { ExecuteInventorizationRelocationsTabProps } from 'features/inventorizations/components/ExecuteInventorizationRelocationsTab/index'
import pick from 'lodash/pick'

import warehousesFixtures from '_tests_/fixtures/warehouse/index'

export const props: ExecuteInventorizationRelocationsTabProps = {
  inventorization: pick(
    warehousesFixtures.inventorization(),
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
