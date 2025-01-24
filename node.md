## ISSUES

### Logic

- Handle trường hợp khi accessToken trong cookie hết hạn nhưng vẫn vào được page protected do cache của Next.js bằng cách là khi accessToken hết hạn chúng ta sẽ cho logout và refresh lại các page ở server Next.js

### UI

## TODO

- Giảm bớt số lượng product khi get `products` và `products-by-category` để tăng tốc độ load trang.
- Giảm bớt số lượng related products khi get `product-detail` để tăng tốc độ load trang.

### Logic

- Thử trường hợp không gởi accessToken thông qua header khi gọi api cần accessToken để biết error trả về có dạng như thế nào
- Update profile chỉ cập nhật những field sau:

```typescript
  name: string;
  avatar: string | null;
  fb: string | null,
  birthday: string, // ISO 8601
  gender: male | female | other | null,
  phone: string, // Đúng định dạng sdt Việt Nam
```

### UI

## Các loại lỗi

### Other: Lỗi của backend, không can thiệp được, phải chặn ở frontend

- khi nào thì currentPage trong paginate của response là null?
- Không cho update username nhưng không báo lỗi, chỉ trả về thông tin cũ. Lỗi này phải chặn ở frontend.
- Khi đăng ký thì name là bắt buộc phải có từ 1 ký tự nhưng trong update thì có thể chuyển thành null or "". Lỗi này phải chặn ở frontend.

### Lỗi 400: Bad request

- Trong body thiếu field nào đó hoặc có field nào đó invalid khi `login` hoặc `register`.
- Tài khoản đã tồn tại khi `register`.
- Thiếu field password trong route `change-password-by-code`.
- Thiếu field refreshToken trong route `refresh-token`.
- Thiếu field code trong route `login-by-code`.
- username đã được kích hoạt nhưng còn yêu cầu `resend-email`.

- get `product-detail`, sản phẩm không tồn tại.
- get `order-detail`, order không tồn tại.
- add `review`, truyền sai id đơn hàng, trả về error đơn hàng không tồn tại.

- BUG: Khi thiếu field code trong route `change-password-by-code` thì vẫn nhận được response là accessToken và refreshToken nhưng đó là tài khoản không hợp lệ. Chú ý bug này.

## Lỗi 401. Unauthorized

- Không gởi access token thông qua header. Error trả về là text `Unauthorized`

## Lỗi 403: Forbidden

- TOKEN HẾT HẠN. Trả về `error_code` là `TOKEN_EXPIRED`.
- Access token được gởi thông qua header bị sai. Trả về `error_code` là `TOKEN_INVALID`.
- Username không tồn tại khi `login`.
- Password không khớp với username khi `login`.
- field code trong body của route `login-by-code` hoặc `change-password-by-code` không đúng.
- Truyền token dị dạng hoặc không đúng vào body của route `refresh-token`
