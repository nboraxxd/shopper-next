export function extractShippingDays(description: string): [number, number] {
  // Tìm tất cả các số trong chuỗi
  const matches = description.match(/\d+/g)

  if (!matches || matches.length < 2) {
    throw new Error('Description phải chứa đúng hai số ngày (from và to)')
  }

  const from = Number(matches[0])
  const to = Number(matches[1])

  if (from > to) {
    throw new Error("Số ngày 'from' phải nhỏ hơn hoặc bằng 'to'")
  }

  return [from, to]
}
