# Internal Module Contracts

## Purpose
This document defines the rules for communication between EngineeringOS modules.

## AI Engine -> Calculation Engine
Request:
```json
{
  "type": "stress_analysis",
  "material": "steel",
  "length": 3,
  "load": 500
}
```

Response:
```json
{
  "stress": 120,
  "safety_factor": 2.4
}
```

## Calculation Engine -> Simulation Engine
Request:
```json
{
  "simulation": "FEA",
  "geometry": "beam.step",
  "material": "steel"
}
```

Response:
```json
{
  "simulation_id": "SIM-001",
  "status": "complete"
}
```

## Communication Principles
- Contracts must be explicit and versioned.
- Inputs and outputs must be validated.
- Cross-module calls must preserve project context.
