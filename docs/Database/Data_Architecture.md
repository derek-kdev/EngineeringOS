# Data Architecture

## Core Data Domains
- Users
- Projects
- Requirements
- Components
- Calculations
- Simulations
- Documents
- Experiments
- Knowledge

## Relationship Model
```text
User
  owns -> Project
  contains -> Simulation
  produces -> Results
```

## Database Principles
- Use the database as the system of record for structured data.
- Store large artifacts in object storage where appropriate.
- Preserve links between project entities and evidence.
