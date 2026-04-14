# Snippet Vault

Mini full-stack app for storing snippets (notes, links, commands)

## Tech Stack
- Next.js (App Router)
- NestJS
- MongoDB (Mongoose)
- TypeScript
- TailwindCSS

## Features
- Create / Read / Update / Delete snippets
- Search by title/content
- Filter by tags
- Pagination
- Responsive UI

## Setup Backend
- cd backend
- npm install
- npm run start:dev
- Runs: (http://localhost:3000)

## Setup Frontend
- cd frontend
- npm install
- npm run dev
- Runs: (http://localhost:3001 or http://localhost:3000 if free)

## backend/.env

- MONGO_URI=mongodb+srv://admin:admin123@cluster0.rqtuead.mongodb.net/?appName=Cluster0

## API Endpoints

1. POST /snippets
  - JSON {  "title": "Example",
  "content": "Example content",
  "tags": ["react", "nest"],
  "type": "note"}

2. GET /snippets
  - Query params:?q=searchText&tag=react
3. GET /snippets/:id
4. PATCH /snippets/:id
  - {
  "title": "Updated title",
  "content": "Updated content",
  "tags": ["new", "tags"],
  "type": "note"
}
5. DELETE /snippets/:id

## Backend build
 - npm run build

## Frontend build
  - npm run build

##  Run in production mode:
  - backend: npm run start:prod
  - frontend: npm run start