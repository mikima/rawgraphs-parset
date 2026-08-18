import chart from 'customcharts/parset'
import data from '../datasets/titanic.csv'

// same as parset01-straightribbons, but with curved ribbons (tension < 1)
export default {
  chart,
  data,
  dataTypes: {
    Class: 'string',
    Sex: 'string',
    Age: 'string',
    Survived: 'string',
    Freq: 'number',
  },
  mapping: {
    sets: { value: ['Class', 'Sex', 'Age', 'Survived'] },
    size: { value: ['Freq'] },
  },
  visualOptions: {
    width: 800,
    height: 600,
    background: 'white',
    linkShape: 'ribbon',
    tension: 0.4,
  },
}
