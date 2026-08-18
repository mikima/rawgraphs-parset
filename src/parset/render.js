import * as d3 from 'd3'
import { parsetsLayout } from 'd3-parsets'
import { legend, labelsOcclusion } from '@rawgraphs/rawgraphs-core'
import '../d3-styles.js'

// A ribbon (filled shape) between a source and a target category segment.
// tension === 1 gives the straight-sided ribbon from the d3-parsets README;
// tension < 1 bows the two edges into an S-curve (same idea as sankey links,
// rotated 90° since the flow here runs top-to-bottom).
function ribbonPath(tension) {
  return function (d) {
    const s = d.source
    const t = d.target
    const sx = s.category.x + s.x
    const sy = s.y
    const tx = t.category.x + t.x
    const ty = t.y
    if (tension >= 1) {
      return `M${sx},${sy}L${tx},${ty}h${t.dx}L${sx + s.dx},${sy}Z`
    }
    const m0 = tension * sy + (1 - tension) * ty
    const m1 = tension * ty + (1 - tension) * sy
    return `M${sx},${sy}C${sx},${m0} ${tx},${m1} ${tx},${ty}h${t.dx}C${
      tx + t.dx
    },${m1} ${sx + s.dx},${m0} ${sx + s.dx},${sy}Z`
  }
}

// A single stroked centerline (d3.linkVertical()'s fixed bump curve)
// through the middle of the source/target category segments, with
// stroke-width equal to the flow's width — as suggested in d3-parsets'
// own render example for a "line" link style.
const lineLink = d3
  .linkVertical()
  .x((p) => p.category.x + p.x + p.dx / 2)
  .y((p) => p.y)

export function render(
  svgNode,
  data,
  visualOptions,
  mapping,
  originalData,
  styles
) {
  const {
    // artboard
    width,
    height,
    background,
    // margins
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // legend
    showLegend,
    legendWidth,
    // chart
    nodeThickness,
    spacing,
    linkShape,
    tension,
    ribbonOpacity,
    // color
    colorScale,
    // labels
    showDimensionLabels,
    showCategoryLabels,
    showValues,
  } = visualOptions

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  const chartWidth = Math.max(0, width - margin.left - margin.right)
  const chartHeight = Math.max(0, height - margin.top - margin.bottom)

  const setColumns = mapping.sets.value

  // compute the parallel sets geometry: stacked category bars per set,
  // and the ribbons connecting categories of adjacent sets.
  const { dimensions: psDimensions, links } = parsetsLayout()
    .width(chartWidth)
    .height(chartHeight)
    .spacing(spacing)
    .nodeThickness(nodeThickness)
    .dimensions(setColumns)
    .value((d) => d.__value)(data)

  const svg = d3.select(svgNode)

  // the canvas grows by legendWidth when the legend is shown (it lives in
  // its own reserved strip to the right, so it never overlaps the chart)
  svg
    .append('rect')
    .attr('id', 'background')
    .attr('width', showLegend ? width + legendWidth : width)
    .attr('height', height)
    .attr('fill', background)

  const g = svg
    .append('g')
    .attr('id', 'visualization')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  // ribbons, colored by the category they originate from in the first set
  const linksLayer = g
    .append('g')
    .attr('id', 'links')
    .selectAll('path')
    .data(links)
    .join('path')

  if (linkShape === 'line') {
    linksLayer
      .attr('fill', 'none')
      .attr('stroke', (d) => colorScale(d.rootCategory))
      .attr('stroke-opacity', ribbonOpacity)
      .attr('stroke-width', (d) => Math.max(0, d.source.dx))
      .attr('d', lineLink)
  } else {
    linksLayer
      .attr('stroke', 'none')
      .attr('fill', (d) => colorScale(d.rootCategory))
      .attr('fill-opacity', ribbonOpacity)
      .attr('d', ribbonPath(tension))
  }

  linksLayer
    .append('title')
    .text((d) => `${d.path.split('\0').join(' → ')}: ${d.count}`)

  // category bars, one row (dimension) per mapped set
  const dimensionsLayer = g.append('g').attr('id', 'sets')

  const dimensionGroups = dimensionsLayer
    .selectAll('g')
    .data(psDimensions)
    .join('g')
    .attr('class', 'set')

  dimensionGroups
    .selectAll('rect')
    .data((d) => d.categories.map((c) => ({ ...c, dimensionY: d.y })))
    .join('rect')
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.dimensionY - nodeThickness / 2)
    .attr('width', (d) => Math.max(0, d.dx))
    .attr('height', nodeThickness)
    .attr('fill', '#4d4d4d')
    .append('title')
    .text((d) => `${d.name}: ${d.count}`)

  // set (dimension) names, to the left of each row
  if (showDimensionLabels) {
    dimensionsLayer
      .append('g')
      .attr('id', 'setLabels')
      .selectAll('text')
      .data(psDimensions)
      .join('text')
      .attr('x', -8)
      .attr('y', (d) => d.y)
      .attr('text-anchor', 'end')
      .attr('alignment-baseline', 'middle')
      .text((d) => d.name)
      .styles(styles.axisLabel)
  }

  // category names (and, optionally, values) above each bar
  if (showCategoryLabels) {
    const categoryLabels = dimensionGroups
      .append('g')
      .selectAll('text')
      .data((d) => d.categories.map((c) => ({ ...c, dimensionY: d.y })))
      .join('text')
      .attr('x', (d) => d.x + d.dx / 2)
      .attr('y', (d) => d.dimensionY - nodeThickness / 2 - 4)
      .attr('text-anchor', 'middle')

    categoryLabels
      .append('tspan')
      .text((d) => d.name)
      .styles(styles.labelPrimary)

    if (showValues) {
      categoryLabels
        .append('tspan')
        .attr('x', (d) => d.x + d.dx / 2)
        .attr('dy', parseFloat(styles.labelSecondary.fontSize) + 2)
        .text((d) => d.count)
        .styles(styles.labelSecondary)
    }

    // hide overlapping labels, keeping the ones for bigger categories
    labelsOcclusion(categoryLabels, (d) => d.count)
  }

  // legend for the color scale (first set), in its own reserved strip
  // to the right of the chart so it never overlaps it (see "showLegend"/
  // "legendWidth" in visualOptions.js)
  if (showLegend && setColumns.length) {
    const legendLayer = svg
      .append('g')
      .attr('id', 'legend')
      .attr('transform', `translate(${width},${margin.top})`)

    const chartLegend = legend().legendWidth(legendWidth)
    chartLegend.addColor(setColumns[0], colorScale)
    legendLayer.call(chartLegend)
  }
}
