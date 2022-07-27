import humanizeDuration, {
  HumanizeDurationOptions,
} from 'shared/utils/date/humanizeDuration'

const humanizeDurationOptions: HumanizeDurationOptions = {
  language: 'shortRu',
  delimiter: ' ',
  units: ['h', 'm'],
  round: true,
}

export const getOlaNextBreachTimeAndCurrentMomentDiff = (
  value: number,
): ReturnType<typeof humanizeDuration> => {
  return humanizeDuration(value, humanizeDurationOptions)
}
