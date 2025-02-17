import { ExecuteInventorizationDiscrepanciesProps } from 'features/inventorizations/components/ExecuteInventorizationDiscrepanciesTab/index'
import pick from 'lodash/pick'

import inventorizationsFixtures from '_tests_/fixtures/inventorizations'

export const props: ExecuteInventorizationDiscrepanciesProps = {
  inventorization: pick(inventorizationsFixtures.inventorizationDetail(), 'id'),
}

export enum TestIdsEnum {
  ExecuteInventorizationDiscrepanciesTab = 'execute-inventorization-discrepancies-tab',
}
