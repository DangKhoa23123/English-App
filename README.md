# Book Store

Full-stack book store with Next.js 15, Express, and MongoDB.

## Project structure

```
client/          # Next.js 15 App Router frontend
server/          # Express + Mongoose API
severs/          # Legacy backend (use server/ instead)
```

## Features

- User registration and login (JWT)
- Browse books with search and category filters
- Book detail pages
- Shopping cart (add, update, remove)
- Checkout and order history
- Admin: add new books

## Setup

### 1. MongoDB

Run MongoDB locally or use Atlas.

### 2. Backend

```bash
cd server
cp .env.example .env
# Edit MONGO_URI and JWT_SECRET
npm install
npm run dev
```

API runs at `http://localhost:3000`.

### 3. Frontend

```bash
cd client
cp .env.example .env.local
npm install
npm run dev
```

App runs at `http://localhost:3000`.

## Create an admin user

Register via `/register`, then in MongoDB set the user role to `admin`:

```js
db.users.updateOne({ email: "you@example.com" }, { $set: { role: "admin" } })
```
