# Nodejs MongoDB Rest Api

Complete CRUD app with MongoDB and Expressjs

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install
```

Create a `.env` file and add the following variables:

```bash
DB_URL= # Database URL
```

## Development Server

Start the development server on http://localhost:3001

```bash
# yarn
yarn dev

# npm
npm run dev
```

## Routes

```bash
GET     /posts/        # Get all post with pagination
GET     /posts/:id     # GEt Single post
POST    /posts/        # Add  post
PATCH   /posts/        # Update one post
DELETE  /posts/        # Delete one post
```
