# Inventory Management System API

A RESTful API built with Node.js and MongoDB for managing warehouse inventory, featuring stock tracking and low stock alerts.

## 🚀 Features

- **Product Management:** Complete CRUD operations
- **Stock Control:** Increase/decrease inventory with validation
- **Low Stock Monitoring:** Automatic tracking of items below threshold
- **Data Validation:** Prevents negative stock

## 🛠️ Tech Stack

- Node.js & Express.js
- MongoDB & Mongoose
- Jest & Supertest
- dotenv for configuration

## 📋 Prerequisites

- Node.js
- MongoDB
- npm or yarn

## ⚙️ Installation

1. Clone the repository:
```bash
git clone https://github.com/dhruvjhamb1/inventory-api
cd inventory-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
touch .env
```

4. Configure environment variables in `.env`:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/inventory-api
```

## 🚀 Running the Application

1. Start MongoDB:
```bash
mongod
```

2. Run the server:
```bash
# Development mode
npm run dev
```

## 🧪 Running Tests

```bash
npm test
```

## 📝 API Endpoints

### Products
- `POST /api/products` - Create new product
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get single product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Inventory Management
- `POST /api/products/:id/increase-stock` - Add stock
- `POST /api/products/:id/decrease-stock` - Remove stock
- `GET /api/low-stock-products` - List low stock items

## 📦 Sample Requests

### Create Product
```bash
curl -X POST http://localhost:3000/api/products \
-H "Content-Type: application/json" \
-d '{
  "name": "Table",
  "description": "Premium Table",
  "stock_quantity": 100,
  "low_stock_threshold": 20
}'
```

### Update Product
```bash
curl -X PUT http://localhost:3000/api/products/:id/increase-stock \
-H "Content-Type: application/json" \
-d '{
  "name": "Table",
  "description": "Luxury Table",
  "stock_quantity": 50,
  "low_stock_threshold": 10
}'
```

### Update Quantity
```bash
curl -X POST http://localhost:3000/api/products/:id/increase-stock  \
-H "Content-Type: application/json" \
-d '{
  "quantity": 30
}'
```

## Design Decisions & Assumptions

1. **Stock Validation**
   - Stock quantity cannot be negative
   - Validation occurs at both schema and controller level

2. **Low Stock Threshold**
   - Default threshold set to 10 units
   - Customizable per product

3. **Error Handling**
   - Comprehensive error messages
   - Appropriate HTTP status codes

4. **Database Indexes**
   - MongoDB's default `_id` index used