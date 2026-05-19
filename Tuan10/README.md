Trần Xuân Trường-22688851
Trần Việt Nhân-22690621
Hà Xuân Phú - 22691261 


## API Gateway

Project now uses an API Gateway at `http://localhost:8000`.

### Routes

- `POST /login`, `POST /register`, `GET /users`, `GET /users/:id` -> User Service
- `GET /foods`, `POST /foods`, `PUT /foods/:id`, `DELETE /foods/:id` -> Food Service
- `GET /orders`, `POST /orders`, `PUT /orders/:id/status` -> Order Service
- `POST /payments` -> Payment Service
- `GET /health` -> Gateway health check

### Run

Install dependencies in each service folder first if needed:

```bash
npm install
cd user-service && npm install
cd ../food-service && npm install
cd ../order-service && npm install
cd ../payment-service && npm install
cd ../api-gateway && npm install
```

Start all backend services from the project root:

```bash
npm start
```

Frontend calls the gateway through `VITE_API_GATEWAY_URL`; if the variable is not set, it defaults to `http://localhost:8000`.
