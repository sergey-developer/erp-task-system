import { getRequestMocker } from '../../../../../_tests_/mocks/request'
import { HttpMethodEnum } from '../../../../../shared/constants/http'
import { WorkGroupEndpointsEnum } from '../../../constants/api'

const getWorkGroupListMocker = getRequestMocker(
  HttpMethodEnum.Get,
  WorkGroupEndpointsEnum.WorkGroupList,
)
