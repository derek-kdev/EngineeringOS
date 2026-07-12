# Engineering Project Object

## Purpose
The Engineering Project Object (EPO) is the primary domain object that anchors all engineering activity in EngineeringOS.

## Core Structure
```json
{
  "id": "ENG-001",
  "name": "Solar Irrigation System",
  "domain": ["Electrical", "Mechanical"],
  "requirements": {},
  "constraints": {},
  "components": [],
  "calculations": [],
  "simulations": [],
  "documents": [],
  "experiments": [],
  "reports": [],
  "knowledge_links": []
}
```

## Relationship to Platform Modules
- AI Engine interprets the project and suggests next steps.
- Calculation Engine evaluates equations and assumptions.
- Simulation Engine validates behavior against models.
- CAD Integration manages relevant design assets.
- Prototype Lab tracks implementation evidence.
- Backend stores and exposes the object through APIs.
