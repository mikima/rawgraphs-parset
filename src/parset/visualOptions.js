export const visualOptions = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 30,
    group: 'artboard',
  },

  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 20,
    group: 'artboard',
  },

  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 20,
    group: 'artboard',
  },

  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 120,
    group: 'artboard',
  },

  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: true,
    group: 'artboard',
  },

  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false,
    },
    container: 'width',
    containerCondition: {
      showLegend: true,
    },
  },

  nodeThickness: {
    type: 'number',
    label: 'Bars thickness',
    default: 10,
    group: 'chart',
  },

  spacing: {
    type: 'number',
    label: 'Total category spacing',
    default: 4,
    min: 0,
    group: 'chart',
  },

  sortCategoriesBy: {
    type: 'text',
    label: 'Sort sets in step',
    group: 'chart',
    options: [
      { label: 'Original (dataset order)', value: 'original' },
      { label: 'Name (A-Z)', value: 'name' },
      { label: 'Size (descending)', value: 'sizeDescending' },
      { label: 'Size (ascending)', value: 'sizeAscending' },
    ],
    default: 'original',
    // one dropdown per column mapped to "sets" — each set can be sorted
    // independently (RAWGraphs expands this into an array of values, one
    // per mapped column, in the same order as mapping.sets.value)
    repeatFor: 'sets',
  },

  linkShape: {
    type: 'text',
    label: 'Ribbons shape',
    group: 'chart',
    options: [
      { label: 'Ribbon (filled)', value: 'ribbon' },
      { label: 'Line (stroked centerline)', value: 'line' },
    ],
    default: 'ribbon',
  },

  tension: {
    type: 'number',
    label: 'Ribbons curvature (0-1)',
    default: 1,
    step: 0.1,
    min: 0,
    max: 1,
    group: 'chart',
    disabled: {
      linkShape: 'line',
    },
  },

  ribbonOpacity: {
    type: 'number',
    label: 'Ribbons opacity (0-1)',
    default: 0.6,
    step: 0.1,
    min: 0,
    max: 1,
    group: 'chart',
  },

  colorScale: {
    type: 'colorScale',
    label: 'Color scale (by first set)',
    dimension: '__root',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
    },
    group: 'colors',
  },

  showDimensionLabels: {
    type: 'boolean',
    label: 'Show set names',
    default: true,
    group: 'Labels',
  },

  showCategoryLabels: {
    type: 'boolean',
    label: 'Show category names',
    default: true,
    group: 'Labels',
  },

  showValues: {
    type: 'boolean',
    label: 'Show category values',
    default: false,
    group: 'Labels',
    disabled: {
      showCategoryLabels: false,
    },
  },
}
