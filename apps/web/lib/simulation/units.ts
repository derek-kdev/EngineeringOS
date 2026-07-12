// apps/web/lib/simulation/units.ts

export const UnitSystem = {
  SI: {
    length: "m",
    mass: "kg",
    time: "s",
    force: "N",
    pressure: "Pa",
    temperature: "K",
    energy: "J",
    power: "W",
  },
  Imperial: {
    length: "ft",
    mass: "lb",
    time: "s",
    force: "lbf",
    pressure: "psi",
    temperature: "°F",
    energy: "ft·lb",
    power: "hp",
  },
};

export const convert = (value: number, fromUnit: string, toUnit: string): number => {
  const conversions: Record<string, Record<string, (v: number) => number>> = {
    m: {
      mm: (v) => v * 1000,
      cm: (v) => v * 100,
      km: (v) => v / 1000,
      ft: (v) => v * 3.28084,
      in: (v) => v * 39.3701,
    },
    kg: {
      g: (v) => v * 1000,
      lb: (v) => v * 2.20462,
    },
    N: {
      kN: (v) => v / 1000,
      lbf: (v) => v * 0.224809,
    },
    Pa: {
      kPa: (v) => v / 1000,
      MPa: (v) => v / 1e6,
      GPa: (v) => v / 1e9,
      psi: (v) => v * 0.000145038,
    },
    J: {
      kJ: (v) => v / 1000,
      "ft·lb": (v) => v * 0.737562,
    },
    W: {
      kW: (v) => v / 1000,
      hp: (v) => v * 0.00134102,
    },
    "°C": {
      K: (v) => v + 273.15,
      "°F": (v) => (v * 9) / 5 + 32,
    },
  };

  // Direct conversion
  if (conversions[fromUnit] && conversions[fromUnit][toUnit]) {
    return conversions[fromUnit][toUnit](value);
  }
  // Reverse conversion
  if (conversions[toUnit] && conversions[toUnit][fromUnit]) {
    return 1 / conversions[toUnit][fromUnit](1 / value);
  }
  return value; // no conversion
};