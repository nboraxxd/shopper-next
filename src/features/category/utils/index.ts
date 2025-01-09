export function extractCategorySlug(categorySlugInput: string) {
  const parts = categorySlugInput.split(/-id[^-]*$/)
  return parts[0]
}
