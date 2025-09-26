const Product = require('../models/product');

const productController = {
    // Create a new product
    async createProduct(req, res) {
        try {
            const product = new Product(req.body);
            await product.save();
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Get all products
    async getAllProducts(req, res) {
        try {
            const products = await Product.find({});
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get a single product by ID
    async getProductById(req, res) {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update a product
    async updateProduct(req, res) {
        try {
            const product = await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Delete a product
    async deleteProduct(req, res) {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Increase stock quantity
    async increaseStock(req, res) {
        try {
            const { quantity } = req.body;
            if (!quantity || quantity <= 0) {
                return res.status(400).json({ error: 'Invalid quantity provided' });
            }

            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            product.stock_quantity += quantity;
            await product.save();
            res.json(product);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Decrease stock quantity
    async decreaseStock(req, res) {
        try {
            const { quantity } = req.body;
            if (!quantity || quantity <= 0) {
                return res.status(400).json({ error: 'Invalid quantity provided' });
            }

            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            if (product.stock_quantity < quantity) {
                return res.status(400).json({ error: 'Insufficient stock' });
            }

            product.stock_quantity -= quantity;
            await product.save();
            res.json(product);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Get products below threshold
    async getLowStockProducts(req, res) {
        try {
            const products = await Product.find({
                $expr: {
                    $lt: ["$stock_quantity", "$low_stock_threshold"]
                }
            });
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = productController;