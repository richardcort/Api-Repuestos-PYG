const port = process.env.API_PORT || 3000
const pre = '/api'

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Repuestos-p&g',
            version: '1.0.0',
            description: 'API Documentation',
        },
        servers: [
            {
                url: `http://localhost:${port}${pre}`,
            },
        ],
    },
    apis: ['./src/routes*.js'],
    basePath: '/api'
}

export { swaggerOptions }