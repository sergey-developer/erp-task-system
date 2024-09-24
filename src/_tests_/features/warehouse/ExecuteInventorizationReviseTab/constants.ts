import pick from 'lodash/pick'

import { ExecuteInventorizationReviseTabProps } from 'modules/warehouse/components/ExecuteInventorizationReviseTab/index'

import warehouseFixtures from '_tests_/fixtures/warehouse/index'

export const props: ExecuteInventorizationReviseTabProps = {
  inventorization: pick(warehouseFixtures.inventorization(), 'id', 'warehouses'),
}

export enum TestIdsEnum {
  ExecuteInventorizationReviseTab = 'execute-inventorization-revise-tab',
}
