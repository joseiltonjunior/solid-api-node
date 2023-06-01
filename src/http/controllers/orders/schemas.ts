import { RouteShorthandOptions } from 'fastify'

interface schemasProps {
  createOrder: RouteShorthandOptions
  fetchOrder: RouteShorthandOptions
}

export const schemasOrders: schemasProps = {
  createOrder: {
    schema: {
      tags: ['Orders'],
      summary: 'Create a new order',
      body: {
        type: 'object',
        properties: {
          methodPaymentId: { type: 'string' },
          paymentIntentId: { type: 'string' },
          listProducts: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                priceId: { type: 'string' },
                quantity: { type: 'number' },
                imgUrl: { type: 'string' },
              },
            },
          },
        },
      },
      response: {
        201: {
          description: 'Successful response',
          type: 'object',
          properties: {
            id: { type: 'number' },
            user_id: { type: 'string' },
            method_payment_id: { type: 'string' },
            payment_intent_id: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' },
            products: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  price_id: { type: 'string' },
                  quantity: { type: 'number' },
                  img_url: { type: 'string' },
                  order_id: { type: 'number' },
                },
              },
            },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },

  fetchOrder: {
    schema: {
      tags: ['Orders'],
      summary: 'Fetch user orders',
      querystring: {
        page: { type: 'string' },
      },
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            orders: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  user_id: { type: 'string' },
                  method_payment_id: { type: 'string' },
                  payment_intent_id: { type: 'string' },
                  created_at: { type: 'string', format: 'date-time' },
                  products: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'number' },
                        price_id: { type: 'string' },
                        quantity: { type: 'number' },
                        img_url: { type: 'string' },
                        created_at: { type: 'string', format: 'date-time' },
                        order_id: { type: 'number' },
                      },
                    },
                  },
                },
              },
            },
            currentPage: { type: 'number' },
            totalItems: { type: 'number' },
            totalPages: { type: 'number' },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
}
