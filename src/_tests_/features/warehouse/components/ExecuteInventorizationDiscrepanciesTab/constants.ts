import pick from 'lodash/pick'

import { ExecuteInventorizationDiscrepanciesProps } from 'features/warehouse/components/ExecuteInventorizationDiscrepanciesTab/index'

import warehouseFixtures from '_tests_/fixtures/warehouse/index'

export const props: ExecuteInventorizationDiscrepanciesProps = {
  inventorization: pick(warehouseFixtures.inventorization(), 'id'),
}

export enum TestIdsEnum {
  ExecuteInventorizationDiscrepanciesTab = 'execute-inventorization-discrepancies-tab',
}
