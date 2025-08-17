# Prescripta API 🧪

REST API for browsing NHS-prescription data (BNF taxonomy: Chapters → Sections → Paragraphs → Chemical Substances + stats).

---

## ✨ Features
- Read-only endpoints for:
  - 📖 Chapters  
  - 📑 Sections  
  - 📝 Paragraphs  
  - ⚗️ Chemical Substances  
- Input validation for query and route parameters  
- Consistent error and status policy  
- Pagination and search for large datasets  

---

## 📡 Status
🚧 **Work in Progress**  
- ✅ Read-only endpoints implemented for (BNF) chapters, sections, paragraphs, substances  
- ✅ Input validation for query and route parameters  
- ✅ Consistent status code policy (`200`, `400`, `404`, `500`)  
- 🔜 Read-only endpoints for chemical substance stats 
- 🔜 Rate limiting  

---


## 🛠️ Tech Stack
- Node.js + Express 
- Prisma ORM with PostgreSQL  
- Middleware: Helmet (security), Compression (performance)  
- Validation: Custom validators (`validateCode`, `validateInt`, etc.)  

---


## 🚀 Getting Started


### Run locally
```bash
# Clone repo
git clone https://github.com/juliadyrdal/prescripta-api.git
cd prescripta-api

# Install dependencies
npm install

# Environment setup
cp .env.example .env  

# Run locally
npm run dev 

# Server will run at
http://localhost:3000
```

---


## 📖 API Endpoints


### Chapters
- **`GET /api/chapters`** – List all chapters  
- **`GET /api/chapters/:code`** – Fetch a single chapter  
- **`GET /api/chapters/:code/sections`** – List sections in a chapter  

### Sections
- **`GET /api/sections`** – List all sections  
- **`GET /api/sections/:code`** – Fetch a single section  
- **`GET /api/sections/:code/paragraphs`** – List paragraphs in a section  

### Paragraphs
- **`GET /api/paragraphs`** – List all paragraphs  
- **`GET /api/paragraphs/:code`** – Fetch a single paragraph  
- **`GET /api/paragraphs/:code/substances`** – List substances in a paragraph  

### Substances
- **`GET /api/substances`** – List substances (with filters)  
  - Query parameters:  
    - `search` → Text search on substance name  
    - `skip` → Pagination offset (default: `0`)  
    - `take` → Pagination limit (default: `20`, max: `100`)  

