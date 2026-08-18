import thumbnail from './parset_thumb.svg'
import icon from './parset_icon.svg'

export const metadata = {
  name: 'Parallel Sets',
  id: 'customrawcharts.parset',
  thumbnail,
  icon,
  categories: ['correlations', 'proportions'],
  description:
    'Shows how two or more categorical dimensions relate to each other. Each dimension is drawn as a row of stacked bars (one per category, sized by frequency), and ribbons flow between adjacent rows showing how records split across categories. Built on top of the d3-parsets layout (https://github.com/mikima/d3-parsets).',
  code: 'https://github.com/mikima/d3-parsets',
  tutorial: 'https://rawgraphs.io/learning/',
}
