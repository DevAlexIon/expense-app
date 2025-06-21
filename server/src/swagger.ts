import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Expense Tracker API",
      version: "1.0.0",
      description: "API documentation for Expense Tracker project",
    },
    servers: [
      {
        url: "http://localhost:5001",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Transaction: {
          type: "object",
          required: [
            "_id",
            "user",
            "type",
            "amount",
            "category",
            "date",
            "createdAt",
            "updatedAt",
          ],
          properties: {
            _id: { type: "string" },
            user: { type: "string" },
            type: { type: "string", enum: ["income", "expense"] },
            amount: { type: "number" },
            category: { type: "string" },
            description: { type: "string" },
            date: { type: "string", format: "date-time" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },

        UserResponse: {
          type: "object",
          required: ["id", "name", "email"],
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
          },
        },

        AuthResponse: {
          type: "object",
          required: ["token", "user"],
          properties: {
            token: { type: "string" },
            user: {
              type: "object",
              required: ["id", "name", "email"],
              properties: {
                id: { type: "string" },
                name: { type: "string" },
                email: { type: "string" },
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
  apis: ["./src/routes/*.ts"],
});
