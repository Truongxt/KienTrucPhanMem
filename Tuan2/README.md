# Design Pattern Exercises (Node.js)

## Cấu trúc thư mục

- `bai1`: Singleton + Factory Method + Abstract Factory
- `bai2.1`: Quản lý đơn hàng (State + Strategy + Decorator)
- `bai2.2`: Tính thuế sản phẩm (State + Strategy + Decorator)
- `bai2.3`: Hệ thống thanh toán (State + Strategy + Decorator)

Mỗi bài đã được tách thành các module nhỏ để dễ quản lý, ví dụ theo nhóm:

- `models/`
- `state/`
- `strategy/`
- `decorators/`
- `services/` (nếu có)
- `index.js` (điểm chạy demo)

## Cách chạy

Yêu cầu: Node.js >= 18

```bash
node bai1/index.js
node bai2.1/index.js
node bai2.2/index.js
node bai2.3/index.js
```
