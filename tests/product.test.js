const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Product = require('../src/models/product');

beforeAll(async () => {
    // Connect to a test database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/inventory-api-test');
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

beforeEach(async () => {
    await Product.deleteMany({});
});

describe('Product API', () => {
    const testProduct = {
        name: 'Test Product',
        description: 'Test Description',
        stock_quantity: 10,
        low_stock_threshold: 5
    };

    describe('Product CRUD Operations', () => {
        test('Should create a new product', async () => {
            const response = await request(app)
                .post('/api/products')
                .send(testProduct);
            
            expect(response.status).toBe(201);
            expect(response.body.name).toBe(testProduct.name);
        });

        test('Should not create product with negative stock', async () => {
            const response = await request(app)
                .post('/api/products')
                .send({
                    ...testProduct,
                    stock_quantity: -1
                });
            
            expect(response.status).toBe(400);
        });
    });

    describe('Inventory Operations', () => {
        let productId;

        beforeEach(async () => {
            const product = await Product.create(testProduct);
            productId = product._id;
        });

        test('Should increase stock quantity', async () => {
            const response = await request(app)
                .post(`/api/products/${productId}/increase-stock`)
                .send({ quantity: 5 });
            
            expect(response.status).toBe(200);
            expect(response.body.stock_quantity).toBe(15);
        });

        test('Should decrease stock quantity', async () => {
            const response = await request(app)
                .post(`/api/products/${productId}/decrease-stock`)
                .send({ quantity: 5 });
            
            expect(response.status).toBe(200);
            expect(response.body.stock_quantity).toBe(5);
        });

        test('Should not allow stock to go below zero', async () => {
            const response = await request(app)
                .post(`/api/products/${productId}/decrease-stock`)
                .send({ quantity: 15 });
            
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Insufficient stock');
        });

        test('Should identify low stock products', async () => {
            await Product.findByIdAndUpdate(productId, { stock_quantity: 3 });

            const response = await request(app)
                .get('/api/low-stock-products');
            
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0].stock_quantity).toBe(3);
        });
    });
});