import { isBefore, parse } from 'date-fns'

export const isCardExpired = (dateString: string) => {
  if (!dateString || !/^\d{2}\/\d{2}$/.test(dateString)) {
    return false // Nếu định dạng không đúng thì không disable
  }

  const currentDate = new Date()

  // Parse ngày từ credit card (MM/yy)
  const [month, year] = dateString.split('/')
  const cardParsedDate = parse(`${month}/${year}`, 'MM/yy', new Date())

  // Lấy tháng/năm hiện tại để so sánh
  const currentMonthYear = parse(
    `${currentDate.getMonth() + 1}/${currentDate.getFullYear() % 100}`,
    'MM/yy',
    new Date()
  )

  // So sánh: nếu ngày card nhỏ hơn ngày hiện tại thì expired
  return isBefore(cardParsedDate, currentMonthYear)
}
