import { RouteShorthandOptions } from 'fastify'

interface schemasProps {
  registerAddress: RouteShorthandOptions
  editAddress: RouteShorthandOptions
  fetchAddress: RouteShorthandOptions
}

export const schemasAddresses: schemasProps = {
  registerAddress: {
    schema: {
      tags: ['Addresses'],
      summary: 'Register address',
      body: {
        type: 'object',
        properties: {
          street: { type: 'string' },
          country: { type: 'string' },
          number: { type: 'string' },
          state: { type: 'string' },
          zipCode: {
            type: 'string',
            pattern: '^9{5}-9{3}$',
          },
          city: { type: 'string' },
          complement: { type: 'string' },
        },
      },
      response: {
        201: {
          description: 'Successful response',
          type: 'object',
          properties: {
            id: { type: 'number' },
            user_id: { type: 'string', format: 'uuid' },
            street: { type: 'string' },
            country: { type: 'string' },
            number: { type: 'string' },
            state: { type: 'string' },
            zip_code: { type: 'string', pattern: '^9{5}-9{3}$' },
            city: { type: 'string' },
            complement: { type: 'string' },
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
  editAddress: {
    schema: {
      tags: ['Addresses'],
      summary: 'Edit address',
      body: {
        type: 'object',
        properties: {
          street: { type: 'string' },
          country: { type: 'string' },
          number: { type: 'string' },
          state: { type: 'string' },
          zipCode: { type: 'string', pattern: '^9{5}-9{3}$' },
          city: { type: 'string' },
          complement: { type: 'string' },
        },
      },
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            id: { type: 'number' },
            user_id: { type: 'string', format: 'uuid' },
            street: { type: 'string' },
            country: { type: 'string' },
            number: { type: 'string' },
            state: { type: 'string' },
            zip_code: { type: 'string', pattern: '^9{5}-9{3}$' },
            city: { type: 'string' },
            complement: { type: 'string' },
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

  fetchAddress: {
    schema: {
      tags: ['Addresses'],
      summary: 'Fetch address',
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            id: { type: 'number' },
            user_id: { type: 'string', format: 'uuid' },
            street: { type: 'string' },
            country: { type: 'string' },
            number: { type: 'string' },
            state: { type: 'string' },
            zip_code: { type: 'string', pattern: '^9{5}-9{3}$' },
            city: { type: 'string' },
            complement: { type: 'string' },
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
}
