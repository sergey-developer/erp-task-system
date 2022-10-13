import { BooleanMap } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

const getBooleanMap = <T, O extends object>(
  type: T,
  obj: O,
  customizeKey?: (key: string) => string,
) =>
  Object.entries(obj).reduce<BooleanMap<string>>((acc, [key, value]) => {
    const booleanKey = `is${key}`
    const newKey = customizeKey ? customizeKey(booleanKey) : booleanKey
    acc[newKey] = isEqual(value, type)
    return acc
  }, {})

export default getBooleanMap
