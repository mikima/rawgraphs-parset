import chart from 'customcharts/parset'
import data from '../datasets/titanic.csv'

// same as parset01-straightribbons, but each set has its own sort order
// (RAWGraphs "repeatFor: sets" turns sortCategoriesBy into one value per
// mapped set column, in mapping.sets.value order):
// Class by size desc., Sex by name, Age left in dataset order, Survived by size asc.
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
    sortCategoriesBy: ['sizeDescending', 'name', 'original', 'sizeAscending'],
  },
}
