import test from "node:test";
import assert from "node:assert/strict";
import {
  publicMachine,
  customerEmailMachine,
  normalizeSearch,
  machineCode,
  can,
} from "../lib/catalog.mjs";
const machine = {
  id: "fixture",
  code: "RGM-M-000001",
  title: "Test fixture only",
  manufacturer: "Fixture",
  model: "SM 102",
  year: 2005,
  category: "sheetfed-offset",
  location: "Test",
  status: "AVAILABLE",
  sellingPrice: "195000.00",
  currency: "EUR",
  showPublicPrice: false,
  sendEmailPrice: false,
  supplier: "PRIVATE",
  purchasePrice: "PRIVATE",
  internalNotes: "PRIVATE",
  serialNumber: "PRIVATE",
};
test("sold/draft/archived cannot be projected, reserved requires explicit inclusion", () => {
  for (const status of ["SOLD", "ARCHIVED", "DRAFT"])
    assert.equal(publicMachine({ ...machine, status }, true), null);
  assert.equal(publicMachine({ ...machine, status: "RESERVED" }), null);
  assert.ok(publicMachine({ ...machine, status: "RESERVED" }, true));
});
test("all price visibility combinations are independent and no private fields leak", () => {
  for (const showPublicPrice of [true, false])
    for (const sendEmailPrice of [true, false]) {
      const input = { ...machine, showPublicPrice, sendEmailPrice };
      const pub = publicMachine(input),
        email = customerEmailMachine(input);
      assert.equal(pub.price !== null, showPublicPrice);
      assert.equal(email.price !== null, sendEmailPrice);
      assert.equal(JSON.stringify([pub, email]).includes("PRIVATE"), false);
      assert.equal("sendEmailPrice" in pub, false);
    }
});
test("missing price/currency never fabricates an offer and sold never enters email", () => {
  assert.equal(
    customerEmailMachine({
      ...machine,
      sendEmailPrice: true,
      sellingPrice: null,
    }).price,
    null,
  );
  assert.equal(
    publicMachine({ ...machine, showPublicPrice: true, currency: null }).price,
    null,
  );
  assert.equal(customerEmailMachine({ ...machine, status: "SOLD" }), null);
});
test("codes format without truncation beyond six digits; allocator is database-owned", () => {
  assert.equal(machineCode(1n), "RGM-M-000001");
  assert.equal(machineCode(1000000n), "RGM-M-1000000");
  assert.throws(() => machineCode(0n));
  assert.throws(() => machineCode(1));
});
test("common technical spelling and spacing normalize equivalently", () => {
  assert.equal(normalizeSearch("SM 102"), normalizeSearch("SM102"));
  assert.equal(normalizeSearch("5 colours"), normalizeSearch("5 color"));
  assert.equal(normalizeSearch("5 colors"), normalizeSearch("5 colour"));
});
test("sales and marketing do not inherit administrative privileges", () => {
  assert.equal(can("SALES", "internal:read"), false);
  assert.equal(can("SALES", "inventory:write"), false);
  assert.equal(can("SALES", "leads:write"), true);
  assert.equal(can("MARKETING", "leads:read"), false);
  assert.equal(can("MARKETING", "content:write"), true);
  assert.equal(can("ADMIN", "settings:write"), true);
  assert.equal(can("UNKNOWN", "leads:read"), false);
  assert.equal(can("__proto__", "leads:read"), false);
});
