import type { Request, Response } from 'express'

const info = {
  openapi: '3.0.3',
  info: {
    title: 'ChannelX API',
    version: '0.1.0',
    description: 'OpenAPI documentation for ChannelX REST API',
  },
  servers: [{ url: '/v1' }],
  paths: {
    '/health': {
      get: {
        summary: 'Health check',
        responses: { '200': { description: 'OK' } },
      },
    },
    '/auth/register': {
      post: {
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  password: { type: 'string' },
                  role: { type: 'string', enum: ['buyer','seller'] },
                },
                required: ['name','email','password'],
              },
            },
          },
        },
        responses: { '200': { description: 'Registered' }, '409': { description: 'Email taken' } },
      },
    },
    '/auth/login': {
      post: {
        summary: 'Login',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { email: { type: 'string' }, password: { type: 'string' } },
                required: ['email','password'],
              },
            },
          },
        },
        responses: { '200': { description: 'Logged in' }, '401': { description: 'Invalid credentials' } },
      },
    },
    '/auth/refresh': {
      post: { summary: 'Refresh access token', responses: { '200': { description: 'New access token' }, '401': { description: 'Invalid refresh' } } },
    },
    '/auth/logout': {
      post: { summary: 'Logout (revoke refresh token)', responses: { '204': { description: 'Logged out' } } },
    },
    '/auth/me': {
      get: { summary: 'Current user', security: [{ bearerAuth: [] }], responses: { '200': { description: 'User' }, '401': { description: 'Unauthorized' } } },
    },
    '/channels': {
      get: {
        summary: 'List channels',
        parameters: [
          { name: 'search', in: 'query', schema: { type: 'string' } },
          { name: 'platform', in: 'query', schema: { type: 'string', enum: ['YouTube','TikTok','Instagram','Twitter','Twitch','Telegram'] } },
          { name: 'minPrice', in: 'query', schema: { type: 'number' } },
          { name: 'maxPrice', in: 'query', schema: { type: 'number' } },
          { name: 'minFollowers', in: 'query', schema: { type: 'number' } },
          { name: 'niche', in: 'query', schema: { type: 'string' } },
          { name: 'verified', in: 'query', schema: { type: 'boolean' } },
          { name: 'sort', in: 'query', schema: { type: 'string' }, description: 'field:asc|desc' },
          { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1, default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 } },
        ],
        responses: { '200': { description: 'List of channels' } },
      },
      post: {
        summary: 'Create a channel',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  platform: { type: 'string', enum: ['YouTube','TikTok','Instagram','Twitter','Twitch','Telegram'] },
                  handle: { type: 'string' },
                  subscribers: { type: 'integer', minimum: 0 },
                  askingPrice: { type: 'number', minimum: 0 },
                  niche: { type: 'string' },
                  verification: { type: 'boolean' },
                  media: { type: 'object', properties: { avatar: { type: 'string' }, banner: { type: 'string' } } },
                  growthRate: { type: 'number' },
                },
                required: ['name','platform','handle','subscribers','askingPrice'],
              },
            },
          },
        },
        responses: { '201': { description: 'Created' }, '401': { description: 'Unauthorized' }, '403': { description: 'Forbidden' } },
      },
    },
    '/channels/{id}': {
      get: {
        summary: 'Get channel by id',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Channel' }, '404': { description: 'Not found' } },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
  },
} as const

export function mountApiDocs(app: any) {
  app.get('/v1/openapi.json', (_req: Request, res: Response) => {
    res.json(info)
  })

  app.get('/docs', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>ChannelX API Docs</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>body{margin:0;padding:0}</style>
    <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
  </head>
  <body>
    <redoc spec-url="/v1/openapi.json"></redoc>
  </body>
</html>`)
  })
}
