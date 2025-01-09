export function extractProductId(productSlugInput: string) {
  const parts = productSlugInput.split('-p')

  return parts.at(-1)
}

export function extractProductSlug(productSlugInput: string) {
  const slugLastDashIndex = productSlugInput.lastIndexOf('-')
  const partialSlug = productSlugInput.substring(0, slugLastDashIndex)

  return partialSlug
}
