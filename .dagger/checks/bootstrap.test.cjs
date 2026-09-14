const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { test } = require('node:test');

test('qualification uses Node 22 and the built-in test runner', () => {
  assert.equal(process.versions.node.split('.')[0], '22');
});

test('tracked README identifies the bootstrap repository', () => {
  const readme = readFileSync('/bootstrap/README.md', 'utf8');
  assert.match(readme, /^# factory-dashboard-acceptance-20260915\r?$/m);
  assert.match(readme, /\[software-factory-onboarding:v1:[^\]\r\n]+\]/);
});
