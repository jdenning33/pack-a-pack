# PackaPack.co

PackaPack.co is a backpacking pack builder application built with Next.js and Supabase.

## Getting Started

### Prerequisites

Ensure you have a `.env` file with the appropriate Supabase endpoint and keys.

### Running the Application

```bash
npm install
npm run dev
```

## Code Structure

PackaPack uses a custom folder structure to organize its codebase:

### `/app`
Contains page definitions and high-level content. This folder should have minimal business logic.

### `/ui`
Houses reusable UI components without business logic. These components should be generic enough to use in any project. Most non-layout styling should reside here.

### `/features`
The core of the application, containing all business logic. It's organized into: Contexts, Providers, and Components.

Each feature typically has a single context providing a hook for component functionality. A provider encapsulates the business logic needed to implement the context. Components build upon the context and should aim to minimize their prop usage to promote the context pattern. This allows for flexible and composable components.

Features may have sub-features, for example the 'kit' feature may have a 'card' feature with it's own card specific context. 

### `/lib`
This is for business logic and utilities that extend beyond the front-end. For example, the actual connection and database interaction with supabase lives here. This is also an acceptable spot for frontend helper utilities that are applicable across multiple features. 

## Core Application Concepts

### Pack
- Represents a collection of gear for a specific trip
- Can be public or private
- Editable only by the owner
- Can be cloned by other users

### Kit
- A grouping of gear within a pack (e.g., "Cook Kit", "Sleep Kit")
- Can be used for categorization (e.g., "Miscellaneous", "Emergency")

### Item
- Represents a type of gear in a kit
- Generic terms (e.g., "Flashlight", "Stove")
- Has quantity and "Packed/Not Packed" status

### Gear
- Satisfies/assigned to an item
- Specific manufactured goods (e.g., "MSR Whisperlight", "JetBoil")
- Contains detailed specifications (weight, size, etc.)
- Can be public or private
- Public gear can only be updated by admins
- Users can create private versions of public gear
- Users can create versions of their private gear

## Design Principles

1. Flat structure in `/features` for flexibility and reusability
2. Minimal props for components, rely instead on feature contexts
3. Separation of UI components and business logic
4. Global mutations context for easier testing and development
5. Public/private system for packs and gear
6. Individual pack editing with cloning for collaboration
