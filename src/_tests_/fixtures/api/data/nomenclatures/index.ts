import * as nomenclatureDetail from './nomenclatureDetail'
import * as nomenclatureGroups from './nomenclatureGroups'
import * as nomenclatures from './nomenclatures'

const nomenclaturesFixtures = {
  ...nomenclatureDetail,
  ...nomenclatures,
  ...nomenclatureGroups,
} as const

export default nomenclaturesFixtures
