// src/api/product.js
import axios from './axios';

export const fetchProducts = () => axios.get('/api/product/fetch-product');
export const createProduct = (data) => axios.post('/api/product/create-product', data);
