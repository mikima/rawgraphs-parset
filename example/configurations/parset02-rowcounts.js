import chart from 'customcharts/parset'
import data from '../datasets/titanic.csv'

// same dataset, but without mapping "size": each row counts as 1
// (tests the d3-parsets default value accessor)
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
    sets: { value: ['Survived', 'Class'] },
  },
  visualOptions: {
    width: 800,
    height: 600,
    background: 'white',
    showValues: true,
  },
}
