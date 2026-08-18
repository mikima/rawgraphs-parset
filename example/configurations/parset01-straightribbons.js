import chart from 'customcharts/parset'
import data from '../datasets/titanic.csv'

// default look: straight-sided ribbons (linkShape: "ribbon", tension: 1)
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
  },
}
