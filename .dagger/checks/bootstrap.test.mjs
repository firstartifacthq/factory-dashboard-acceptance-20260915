import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// Bootstrap checks deliberately make no claims about future application behavior.
test('qualification uses the selected Node 22 runtime', () => {
  assert.equal(process.versions.node.split('.')[0], '22');
});

test('the repository bootstrap README is present and identifies this repository', async () => {
  const readme = await readFile(new URL('../../README.md', import.meta.url), 'utf8');
  assert.equal(readme.split(/\r?\n/)[0], '# factory-dashboard-acceptance-20260915');
  assert.match(readme, /\[software-factory-onboarding:v1:[^\]\r\n]+\]/);
});

test('devenv selects the same Node runtime family', async () => {
  const config = await readFile(new URL('../../devenv.nix', import.meta.url), 'utf8');
  assert.match(config, /package\s*=\s*pkgs\.nodejs_22\s*;/);
});
