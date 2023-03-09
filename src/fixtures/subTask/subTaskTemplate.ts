import times from 'lodash/times'

import {
  GetSubTaskTemplateListSuccessResponse,
  SubTaskTemplateModel,
} from 'modules/subTask/models'

import commonFixtures from 'fixtures/common'

import { generateId, generateWord } from '_tests_/utils'

export const getSubTaskTemplate = (): SubTaskTemplateModel => ({
  id: generateId(),
  title: generateWord(),
  code: generateWord(),
})

export const getSubTaskTemplateList = (
  length: number = 1,
): Array<SubTaskTemplateModel> => times(length, () => getSubTaskTemplate())

export const getSubTaskTemplateListResponse = (
  list: GetSubTaskTemplateListSuccessResponse['results'],
) => commonFixtures.getPaginatedListResponse(list)
