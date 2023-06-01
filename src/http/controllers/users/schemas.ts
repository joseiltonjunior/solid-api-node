import { RouteShorthandOptions } from 'fastify'

interface schemasProps {
  createUser: RouteShorthandOptions
  editUser: RouteShorthandOptions
  authUser: RouteShorthandOptions
  refreshToken: RouteShorthandOptions
  fetchUser: RouteShorthandOptions
  fetchManyUsersPaginated: RouteShorthandOptions
}

export const schemasUsers: schemasProps = {
  createUser: {
    schema: {
      tags: ['Users'],
      summary: 'Create a new user',
      body: {
        type: 'object',
        properties: {
          customerId: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
          phone: { type: 'string', pattern: '^[0-9]{11}$' },
        },
      },
      response: {
        201: {
          description: 'Successful response',
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            customer_id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string', pattern: '^[0-9]{11}$' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
  editUser: {
    schema: {
      tags: ['Users'],
      summary: 'Edit user profile',
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string', pattern: '^[0-9]{11}$' },
        },
      },
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            customer_id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string', pattern: '^[0-9]{11}$' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
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
  authUser: {
    schema: {
      tags: ['Users'],
      summary: 'User Authentication',
      body: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
        },
      },
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            token: { type: 'string' },
          },
        },
      },
    },
  },
  refreshToken: {
    schema: {
      tags: ['Users'],
      summary: 'Refresh Token User',

      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            token: { type: 'string' },
          },
        },
      },
    },
  },
  fetchUser: {
    schema: {
      tags: ['Users'],
      summary: 'Fetch user profile',
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            customer_id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string', pattern: '^[0-9]{11}$' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
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
  fetchManyUsersPaginated: {
    schema: {
      tags: ['Users'],
      summary: 'Fetch many users paginated',
      querystring: {
        page: { type: 'string' },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            users: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', format: 'uuid' },
                  customer_id: { type: 'string' },
                  name: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  phone: { type: 'string', pattern: '^[0-9]{11}$' },
                  created_at: { type: 'string', format: 'date-time' },
                  updated_at: { type: 'string', format: 'date-time' },
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
