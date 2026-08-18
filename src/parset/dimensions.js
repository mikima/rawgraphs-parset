export const dimensions = [
  {
    id: 'sets',
    name: 'Sets',
    validTypes: ['string', 'number', 'date'],
    required: true,
    multiple: true,
    minValues: 2,
  },

  {
    id: 'size',
    name: 'Size',
    validTypes: ['number'],
    required: false,
  },
]
