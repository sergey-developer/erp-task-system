import { ExecuteInventorizationDiscrepanciesProps } from 'features/inventorizations/components/ExecuteInventorizationDiscrepanciesTab/index'
import pick from 'lodash/pick'

import warehousesFixtures from '_tests_/fixtures/warehouse/index'

export const props: ExecuteInventorizationDiscrepanciesProps = {
  inventorization: pick(warehousesFixtures.inventorization(), 'id'),
}

export enum TestIdsEnum {
  ExecuteInventorizationDiscrepanciesTab = 'execute-inventorization-discrepancies-tab',
}
