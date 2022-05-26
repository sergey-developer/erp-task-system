import baseHumanizeDuration, {
  Options as BaseOptions,
  SupportedLanguage,
} from 'humanize-duration'

const humanizer = baseHumanizeDuration.humanizer({
  languages: {
    shortRu: {
      h: () => 'ч',
      m: () => 'мин',
    },
  },
  fallbacks: ['en'],
})

type CustomSupportedLanguageUnion = 'shortRu'

export type HumanizeDurationOptions = Omit<BaseOptions, 'fallbacks'> & {
  language?: Extract<SupportedLanguage, 'ru'> | CustomSupportedLanguageUnion
}

const humanizeDuration = (
  value: number,
  { language = 'ru', ...options }: HumanizeDurationOptions,
): ReturnType<typeof humanizer> => {
  return humanizer(value, {
    language,
    ...options,
  })
}

export default humanizeDuration
