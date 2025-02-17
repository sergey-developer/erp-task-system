import { ExecuteInventorizationRelocationsTabProps } from 'features/inventorizations/components/ExecuteInventorizationRelocationsTab/index'
import pick from 'lodash/pick'

import inventorizationsFixtures from '_tests_/fixtures/api/data/inventorizations'

export const props: ExecuteInventorizationRelocationsTabProps = {
  inventorization: pick(
    inventorizationsFixtures.inventorization(),
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
