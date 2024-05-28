# Simple CRUD API

## Importing Dependencies

```typescript
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/product';
```

- **express**: A web framework for Node.js to build web applications and APIs.
- **mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **dotenv**: A module to load environment variables from a `.env` file into `process.env`.
- **Product**: Importing the `Product` model defined in `./models/product`.

## Loading Environment Variables

```typescript
dotenv.config();
```

- Loads environment variables from a `.env` file into `process.env`.

## Initializing Variables

```typescript
const port = process.env.PORT || 4000;
const app = express();
const db = process.env.DB as string;
```

- **port**: Sets the port for the server from environment variables or defaults to 4000.
- **app**: Initializes the Express application.
- **db**: Retrieves the database connection string from environment variables.

## Defining Route Handlers

These functions handle the API requests.

### Get All Products

```typescript
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const product = await Product.find({});
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown Error' });
    }
  }
};
```

- **getAllProducts**: Fetches all products from the database and returns them. If no products are found, it returns a 404 status.

### Get Product By ID

```typescript
const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown Error' });
    }
  }
};
```

- **getProductById**: Fetches a product by its ID. If the product is not found, it returns a 404 status.

### Create a Product

```typescript
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
    if (!product) {
      res.status(401).json({ message: 'Product not created' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown Error' });
    }
  }
};
```

- **createProduct**: Creates a new product using the data in the request body and returns the created product. If the creation fails, it returns a 401 status.

### Update a Product

```typescript
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown Error' });
    }
  }
};
```

- **updateProduct**: Updates a product by its ID with the data in the request body and returns the updated product. If the product is not found, it returns a 404 status.

### Delete a Product

```typescript
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Unknown Error' });
    }
  }
};
```

- **deleteProduct**: Deletes a product by its ID and returns the deleted product. If the product is not found, it returns a 404 status.

## Middleware Setup

```typescript
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
```

- **express.urlencoded**: Parses URL-encoded data with the `querystring` library when `extended` is `false`.
- **express.json**: Parses incoming JSON requests and puts the parsed data in `req.body`.

## Defining Routes

```typescript
app.get('/api/products', getAllProducts);
app.get('/api/products/:id', getProductById);
app.post('/api/products', createProduct);
app.put('/api/products/:id', updateProduct);
app.delete('/api/products/:id', deleteProduct);
```

- Defines the routes and associates them with the corresponding handlers.

## Connecting to the Database

```typescript
const connectionDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('Connection Successful');
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    } else {
      console.error('Unknown Error');
    }
  }
};
```

- **connectionDB**: Connects to the MongoDB database using Mongoose. Logs a success message if the connection is successful and handles errors by logging them.

## Starting the Server

```typescript
connectionDB().then(() =>
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  })
);
```

- Starts the server after the database connection is established. Listens on the specified port and logs a message indicating the server is running.

## Environment File (`.env`)

This file contains sensitive information like database connection strings and port numbers:

```env
DB=mongodb+srv://username:password@cluster0.mongodb.net/simple-crud
PORT=4000
```

## Summary

The code sets up a basic CRUD (Create, Read, Update, Delete) API using Express and MongoDB. It includes:

- Environment variable management with `dotenv`.
- Mongoose for MongoDB interaction.
- Express middleware for parsing request bodies.
- Route handlers for managing product data.
- Error handling for various scenarios.
- Database connection handling and server startup logic.

---

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run app.ts
```

This project was created using `bun init` in bun v1.0.17. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
