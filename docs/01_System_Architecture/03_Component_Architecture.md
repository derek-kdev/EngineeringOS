# Component Architecture

## AI Engine
Location: ai_engine/

Responsibilities:
- Interpret user intent
- Identify engineering domain
- Generate workflows and recommendations
- Coordinate downstream services

Inputs:
- Engineering Project Object
- User requirements
- Knowledge graph data

Outputs:
- Engineering recommendations
- Calculation requests
- Simulation requests
- Documentation plans

Dependencies:
- Knowledge graph
- Calculation engine
- Backend services

## Backend
Location: backend/

Responsibilities:
- Expose platform APIs
- Manage authentication and authorization
- Orchestrate workflows and domain services
- Persist and retrieve project data

## Frontend
Location: frontend/

Responsibilities:
- Provide engineering workspaces
- Render project, simulation, and report views
- Trigger workflows and submit tasks

## Simulation Engine
Location: simulation_engine/

Responsibilities:
- Execute simulation jobs
- Store inputs and outputs
- Support domain-specific solver workflows

## Calculation Engine
Location: calculation_engine/

Responsibilities:
- Perform formula-based engineering calculations
- Enforce unit handling and assumptions
- Produce calculation artifacts

## CAD Integration
Location: cad_integration/

Responsibilities:
- Manage CAD assets and metadata
- Enable model import and revision tracking
- Link models to project context

## Database
Location: database/

Responsibilities:
- Store structural project and platform data
- Preserve results, documents, versions, and events

## Engineering Library
Location: engineering_library/

Responsibilities:
- Host reusable formulas, constants, standards, and domain materials
