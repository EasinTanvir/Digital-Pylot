# Best Car — Car Rental Platform with AI Assistant

Best Car is a car rental platform built as part of the Digital Pylot technical assessment.

The project includes a responsive customer-facing car rental website, an admin dashboard, and an AI assistant that can recommend vehicles, check real availability, and qualify leads automatically.

## Live Application

- **Customer Front-End:** https://digital-pylot.vercel.app/
- **Admin Dashboard:** https://digital-pylot.vercel.app/dashboard
- **Leads:** https://digital-pylot.vercel.app/dashboard/leads

A separate submission document is included with a detailed walkthrough of the requested functional areas, AI demonstration, automation workflow, and screenshots.

## Project Scope

### Customer Front-End

The provided car rental wireframe was converted into a responsive working interface.

The vehicle/deals section is database-driven rather than hardcoded. Vehicles are dynamically grouped and displayed under categories such as:

- Popular Large Cars
- Small Cars
- Exclusive Cars

Vehicle cards are populated from the database and include seeded vehicle information such as pricing, seats, transmission, fuel type, and features.

The customer website also includes a floating AI assistant available throughout the customer-facing experience.

### Admin Dashboard

The admin dashboard was recreated based on the provided Figma design.

Dashboard data such as statistics, charts, tables, vehicles, transactions, and other records are powered by seeded database data.

An additional **Leads** page was implemented specifically to demonstrate the AI lead qualification and automation workflow.

## AI Assistant

The AI assistant is implemented as a tool-calling agent using LangChain and Groq.

It can:

- Understand customer rental requirements
- Search real vehicles from the database
- Recommend vehicles based on customer requirements
- Check vehicle availability for requested dates
- Collect customer contact information
- Automatically qualify and save leads

The assistant uses database-backed tools rather than inventing vehicle information.

### AI Tools

The agent has three primary tools:

- `search_vehicles` — searches the real vehicle inventory based on customer requirements.
- `check_availability` — checks booking conflicts for a specific vehicle and date range.
- `qualify_lead` — saves a qualified lead to the database.

## Automation

When the AI assistant qualifies a lead:

1. A new lead is inserted into PostgreSQL.
2. The lead immediately becomes available on the Admin Dashboard → Leads page.
3. A Slack notification is sent to the configured `#new-leads` channel.

The Slack notification is handled independently from the database write, so a Slack failure does not prevent the lead from being saved.

## Tech Stack

| Area           | Technology                            |
| -------------- | ------------------------------------- |
| Framework      | Next.js, App Router                   |
| UI             | React, Tailwind CSS                   |
| Database       | [Neon PostgreSQL](https://neon.com/)  |
| ORM            | Drizzle ORM                           |
| AI / Agent     | LangChain                             |
| LLM Provider   | [Groq](https://console.groq.com/home) |
| LLM Model      | `openai/gpt-oss-120b`                 |
| LLM Monitoring | LangSmith                             |
| Validation     | Zod                                   |
| Charts         | Recharts                              |
| Animation      | Framer Motion                         |
| HTTP Client    | Axios                                 |
| Automation     | Slack Incoming Webhooks               |

### External Services

- **Neon PostgreSQL** — serverless PostgreSQL database used for vehicles, bookings, leads, transactions, and other application data.
- **Groq** — LLM inference provider used by the LangChain AI assistant.

## Architecture

The customer website communicates with the AI API, where the LangChain agent can call database-backed tools.

The admin dashboard and AI system share the same PostgreSQL database, which provides a single source of truth for vehicles, bookings, and leads.

```text
Customer Front-End
        │
        ▼
   AI Chat Widget
        │
        ▼
    /api/chat
        │
        ▼
 LangChain Agent
   │      │      │
   ▼      ▼      ▼
Search  Check   Qualify
Vehicles Availability Lead
   │      │      │
   └──────┴──────┘
          │
          ▼
    Neon PostgreSQL
          │
          ├──► Admin Dashboard
          │
          └──► Slack Notification
```

## Database

The project uses Drizzle ORM with Neon PostgreSQL.

Main data areas include:

- Vehicles
- Bookings
- Leads
- Brands
- Categories
- Subcategories
- Locations
- Transactions
- Users

The project uses seeded data because the assessment scope does not require production authentication or payment systems.

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/EasinTanvir/Digital-Pylot.git
cd Digital-Pylot
npm install
```

### 2. Configure environment variables

Create a `.env` file based on `.env.example`.

```env
DATABASE_URL=

GROQ_API_KEY=

SLACK_WEBHOOK_URL=

LANGSMITH_TRACING=
LANGSMITH_ENDPOINT=
LANGSMITH_API_KEY=
LANGSMITH_PROJECT=
```

### 3. Setup the database

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

### 4. Start the application

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

Admin Dashboard:

```text
http://localhost:3000/dashboard
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start

npm run db:generate
npm run db:migrate
npm run db:seed
```

## Limitations

This project follows the scope of the technical assessment and therefore uses seeded/mock data.

- No production user authentication.
- No real payment processing.
- The customer-side booking action does not create a real reservation.
- The AI assistant uses the **Groq free API tier**, which is subject to rate limits. If the free-tier usage limit is reached, the AI chatbot may temporarily stop responding or return an API rate-limit error. This is an external API limitation rather than an application error.
- FAQ/policy responses use a small keyword-based dataset rather than a full RAG pipeline.

The AI lead qualification flow is a genuinely live write operation: qualified leads are saved to PostgreSQL and can trigger the Slack automation.
