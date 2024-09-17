import { IdType } from 'shared/types/common'

export const mapIds = <T extends { id: IdType }[]>(arr: T): IdType[] => arr.map(({ id }) => id)
