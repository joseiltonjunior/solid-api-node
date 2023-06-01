import { FastifyDynamicSwaggerOptions } from '@fastify/swagger'

export const swaggerOptions: FastifyDynamicSwaggerOptions = {
  swagger: {
    info: {
      title: "D'Coffee Shop API",
      description: 'API Solid PostgreSQL',
      version: '1.0.0',
    },

    tags: [
      { name: 'Users', description: 'Users routes' },
      { name: 'Addresses', description: 'Addresses routes' },
      { name: 'Orders', description: 'Orders routes' },
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Bearer token authentication',
      },
    },
    definitions: {
      User: {
        type: 'object',
        required: ['email', 'name', 'customer_id', 'password_hash', 'phone'],
        properties: {
          id: { type: 'string', format: 'uuid' },
          customer_id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password_hash: { type: 'string' },
          phone: { type: 'string' },
          created_at: {
            type: 'string',
            format: 'date-time',
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
          },
          role: {
            type: 'string',
            enum: ['CUSTOMER', 'ADMIN'],
          },
          address: {
            $ref: '#/definitions/Address',
          },
          orders: {
            type: 'array',
            items: {
              $ref: '#/definitions/Order',
            },
          },
        },
      },
      Address: {
        type: 'object',
        required: [
          'street',
          'country',
          'state',
          'number',
          'zip_code',
          'complement',
          'city',
          'user_id',
        ],
        properties: {
          id: { type: 'number' },
          street: { type: 'string' },
          country: { type: 'string' },
          state: { type: 'string' },
          number: { type: 'string' },
          complement: { type: 'string' },
          zip_code: { type: 'string' },
          created_at: {
            type: 'string',
            format: 'date-time',
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
          },
          user_id: { type: 'string', format: 'uuid' },
        },
      },
      Product: {
        type: 'object',
        required: ['price_id', 'quantity', 'img_url', 'order_id'],
        properties: {
          id: { type: 'number' },
          price_id: { type: 'string' },
          quantity: { type: 'number' },
          img_url: { type: 'string' },
          created_at: {
            type: 'string',
            format: 'date-time',
          },
          order_id: { type: 'number' },
        },
      },
      Order: {
        type: 'object',
        required: [
          'method_payment_id',
          'payment_intent_id',
          'user_id',
          'products',
        ],
        properties: {
          id: { type: 'number' },
          method_payment_id: { type: 'string' },
          payment_intent_id: { type: 'string' },
          user_id: { type: 'string', format: 'uuid' },
          created_at: {
            type: 'string',
            format: 'date-time',
          },
          products: {
            type: 'array',
            items: {
              $ref: '#/definitions/Product',
            },
          },
        },
      },
    },
  },
}
