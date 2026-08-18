export const mapData = function (data, mapping, dataTypes, dimensions) {
  const setColumns = mapping.sets.value
  const sizeColumn = mapping.size.value

  // d3-parsets aggregates rows internally (one row per record), so we just
  // pass through the mapped columns, using the mapped column names as-is:
  // they are the dimension names the layout groups categories by.
  return data.map((d) => {
    const row = {}
    setColumns.forEach((col) => {
      row[col] = d[col]
    })
    // internal keys (prefixed to avoid clashing with a column named "value"/"root")
    row.__value = sizeColumn ? Number(d[sizeColumn]) || 0 : 1
    row.__root = d[setColumns[0]]
    return row
  })
}
