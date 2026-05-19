require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

const PORT = process.env.PORT || 8000;
const SERVICE_IP = process.env.SERVICE_IP || '0.0.0.0';
const REQUEST_TIMEOUT = Number(process.env.REQUEST_TIMEOUT || 10000);

const services = {
  user: process.env.USER_SERVICE_URL || 'http://172.16.54.78:8081',
  food: process.env.FOOD_SERVICE_URL || 'http://172.16.48.24:8082',
  order: process.env.ORDER_SERVICE_URL || 'http://172.16.48.141:8083',
  payment: process.env.PAYMENT_SERVICE_URL || 'http://172.16.35.88:8084'
};

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    gateway: `http://${SERVICE_IP}:${PORT}`,
    services
  });
});

const buildHeaders = (headers) => {
  const forwardedHeaders = {};
  const allowedHeaders = ['authorization', 'content-type', 'accept'];

  allowedHeaders.forEach((header) => {
    if (headers[header]) {
      forwardedHeaders[header] = headers[header];
    }
  });

  return forwardedHeaders;
};

const proxyTo = (serviceName) => async (req, res) => {
  const targetBaseUrl = services[serviceName];
  const targetUrl = `${targetBaseUrl}${req.originalUrl}`;

  try {
    const response = await axios({
      method: req.method,
      url: targetUrl,
      data: ['GET', 'HEAD'].includes(req.method) ? undefined : req.body,
      headers: buildHeaders(req.headers),
      timeout: REQUEST_TIMEOUT,
      validateStatus: () => true
    });

    if (response.headers['content-type']) {
      res.setHeader('content-type', response.headers['content-type']);
    }

    res.status(response.status).send(response.data);
  } catch (error) {
    const message = error.code === 'ECONNABORTED'
      ? `${serviceName} service timeout`
      : `Cannot connect to ${serviceName} service`;

    console.error(`[API Gateway] ${message}: ${targetUrl}`, error.message);
    res.status(502).json({
      message,
      service: serviceName,
      target: targetBaseUrl
    });
  }
};

app.use('/login', proxyTo('user'));
app.use('/register', proxyTo('user'));
app.use('/users', proxyTo('user'));
app.use('/foods', proxyTo('food'));
app.use('/orders', proxyTo('order'));
app.use('/payments', proxyTo('payment'));

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found in API Gateway',
    route: req.originalUrl
  });
});

app.listen(PORT, SERVICE_IP, () => {
  console.log(`API Gateway running at http://${SERVICE_IP}:${PORT}`);
  console.log('Routing services:', services);
});
