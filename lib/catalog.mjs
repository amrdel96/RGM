const visible = (machine, includeReserved = false) =>
  machine.status === "AVAILABLE" ||
  (includeReserved && machine.status === "RESERVED");

/** Explicit projection: never spread persistence objects into public responses. */
export function publicMachine(machine, includeReserved = false) {
  if (!visible(machine, includeReserved)) return null;
  return {
    id: machine.id,
    code: machine.code,
    title: machine.title,
    manufacturer: machine.manufacturer,
    model: machine.model,
    year: machine.year,
    category: machine.category,
    location: machine.location,
    status: machine.status,
    price:
      machine.showPublicPrice && validPrice(machine)
        ? { amount: machine.sellingPrice, currency: machine.currency }
        : null,
  };
}
function validPrice(machine) {
  return (
    typeof machine.sellingPrice === "string" &&
    /^\d+(\.\d{1,2})?$/.test(machine.sellingPrice) &&
    typeof machine.currency === "string" &&
    /^[A-Z]{3}$/.test(machine.currency)
  );
}
export function customerEmailMachine(machine) {
  const projected = publicMachine(machine, true);
  if (!projected) return null;
  return {
    ...projected,
    price:
      machine.sendEmailPrice && validPrice(machine)
        ? { amount: machine.sellingPrice, currency: machine.currency }
        : null,
  };
}
export function normalizeSearch(value) {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/colours?/g, "color")
    .replace(/colors/g, "color")
    .replace(/[^\p{L}\p{N}]/gu, "");
}
export function machineCode(sequence) {
  if (typeof sequence !== "bigint" || sequence < 1n)
    throw new TypeError("Positive database sequence bigint required");
  return `RGM-M-${sequence.toString().padStart(6, "0")}`;
}
const permissions = {
  ADMIN: [
    "inventory:read",
    "inventory:write",
    "commercial:read",
    "internal:read",
    "leads:read",
    "leads:write",
    "content:write",
    "settings:write",
  ],
  SALES: ["inventory:read", "commercial:read", "leads:read", "leads:write"],
  MARKETING: ["content:write"],
};
export function can(role, action) {
  return Object.hasOwn(permissions, role) && permissions[role].includes(action);
}
