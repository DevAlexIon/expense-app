import path from "path";
import swaggerJSDoc from "swagger-jsdoc";

const routeGlobs = [
  path.join(__dirname, "routes", "*.ts"),
  path.join(__dirname, "routes", "*.js"),
  path.join(__dirname, "../src/routes", "*.ts"),
];

const productionUrl =
  process.env.API_PUBLIC_URL ||
  process.env.RENDER_EXTERNAL_URL ||
  "https://expense-app-m3v9.onrender.com";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Expense Tracker API",
      version: "1.0.0",
      description: "API documentation for Expense Tracker project",
    },
    servers: [
      { url: productionUrl, description: "Production" },
      { url: "http://localhost:5001", description: "Local" },
      { url: "/", description: "Current host" },
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
          required: ["_id", "name", "email", "currency"],
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            currency: { type: "string" },
          },
        },

        AuthResponse: {
          type: "object",
          required: ["token", "user"],
          properties: {
            token: { type: "string" },
            user: {
              type: "object",
              required: ["id", "name", "email", "currency"],
              properties: {
                id: { type: "string" },
                name: { type: "string" },
                email: { type: "string" },
                currency: { type: "string" },
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
  apis: routeGlobs,
});
