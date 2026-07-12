// apps/web/lib/simulation/formulas.ts

// ---- Strength of Materials ----
export const stress = (force: number, area: number): number => force / area;
export const strain = (stress: number, youngsModulus: number): number => stress / youngsModulus;
export const hookesLaw = (force: number, length: number, area: number, E: number): number =>
  (force * length) / (area * E);
export const factorOfSafety = (yieldStrength: number, appliedStress: number): number =>
  yieldStrength / appliedStress;

// ---- Mechanics ----
export const force = (mass: number, acceleration: number): number => mass * acceleration;
export const work = (force: number, distance: number): number => force * distance;
export const power = (work: number, time: number): number => work / time;
export const torque = (force: number, radius: number): number => force * radius;
export const momentum = (mass: number, velocity: number): number => mass * velocity;
export const kineticEnergy = (mass: number, velocity: number): number => 0.5 * mass * velocity ** 2;
export const potentialEnergy = (mass: number, height: number, g: number = 9.81): number =>
  mass * g * height;

// ---- Thermodynamics ----
export const thermalExpansion = (alpha: number, length: number, deltaT: number): number =>
  alpha * length * deltaT;
export const heatTransfer = (mass: number, c: number, deltaT: number): number =>
  mass * c * deltaT;
export const thermalConductivity = (k: number, area: number, deltaT: number, thickness: number): number =>
  (k * area * deltaT) / thickness;

// ---- Fluid Mechanics ----
export const pressure = (force: number, area: number): number => force / area;
export const hydrostaticPressure = (density: number, depth: number, g: number = 9.81): number =>
  density * g * depth;

// ---- Structural ----
export const beamDeflection = (
  load: number,
  length: number,
  E: number,
  I: number
): number => (load * length ** 3) / (3 * E * I);
export const columnBuckling = (
  E: number,
  I: number,
  length: number,
  endCondition: number
): number => (Math.PI ** 2 * E * I) / (endCondition * length ** 2);

// ---- Vibrations ----
export const naturalFrequency = (stiffness: number, mass: number): number =>
  (1 / (2 * Math.PI)) * Math.sqrt(stiffness / mass);

// ---- Friction ----
export const frictionForce = (normalForce: number, coefficient: number): number =>
  normalForce * coefficient;

// ---- Projectile ----
export const projectileRange = (v: number, angleDeg: number, g: number = 9.81): number =>
  (v ** 2 * Math.sin(2 * angleDeg * (Math.PI / 180))) / g;
export const projectileHeight = (v: number, angleDeg: number, g: number = 9.81): number =>
  (v ** 2 * Math.sin(angleDeg * (Math.PI / 180)) ** 2) / (2 * g);

// ---- Geodesy ----
export const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};