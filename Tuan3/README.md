# Design Patterns - Node.js (Tuan 3)

Project này cài đặt các bài toán trong đề bằng Node.js với cấu trúc thư mục tách rõ theo từng pattern để dễ vẽ sơ đồ lớp.

## Cấu trúc thư mục

```text
src/
  index.js
  patterns/
    composite/
      filesystem/
      ui/
    observer/
      core/
      stock/
      task/
    adapter/
    library/
      singleton/
      factory/
      strategy/
      observer/
      decorator/
      models/
```

## Mapping với đề bài

1. **Composite**
   - Quản lý cây thư mục/tập tin: `src/patterns/composite/filesystem`
   - Nhóm thành phần UI: `src/patterns/composite/ui`

2. **Observer**
   - Cổ phiếu thay đổi giá: `src/patterns/observer/stock`
   - Task thay đổi trạng thái: `src/patterns/observer/task`

3. **Adapter**
   - Chuyển JSON <-> XML: `src/patterns/adapter`

4. **Hệ thống thư viện (nhiều pattern)**
   - Singleton: `src/patterns/library/singleton/Library.js`
   - Factory Method: `src/patterns/library/factory/BookFactory.js`
   - Strategy: `src/patterns/library/strategy`
   - Observer: `src/patterns/library/observer`
   - Decorator: `src/patterns/library/decorator`

## Chạy demo

```bash
npm start
```

`src/index.js` sẽ chạy lần lượt tất cả ví dụ để bạn đối chiếu khi vẽ sơ đồ lớp.

## File sơ đồ (Mermaid)

- `docs/diagrams/composite.mmd`
- `docs/diagrams/observer.mmd`
- `docs/diagrams/adapter.mmd`
- `docs/diagrams/library-system.mmd`

Bạn có thể dán các file `.mmd` vào Mermaid Live Editor để xuất ảnh sơ đồ.

## Gợi ý vẽ sơ đồ nhanh

- Composite: vẽ `Component` (abstract/interface) -> `Leaf`, `Composite`; `Composite` chứa `children: Component[]`
- Observer: vẽ `Subject` có `subscribe/unsubscribe/notify`, và `Observer` có `update`
- Adapter: vẽ `Target` interface, `Adapter` bọc `Adaptee`
- Library: vẽ từng cụm pattern riêng rồi ghép vào `Library` làm trung tâm
