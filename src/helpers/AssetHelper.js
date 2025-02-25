function removeAlias(term) {
  const match = term.match(/^([^(]+)\s*\([^)]+\)$/)
  if (match) {
    term = match[1].trim()
  }
  return term
}

function tagAlias(asset) {
  if (null != asset.custom12) {
    return asset.tag + ' (' + asset.custom12 + ')'
  }
  return asset.tag
}

export { removeAlias, tagAlias }
