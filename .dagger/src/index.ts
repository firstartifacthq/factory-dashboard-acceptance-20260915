import { argument, dag, Directory, func, object } from "@dagger.io/dagger";

@object()
export class Bootstrap {
  /** Qualify only the tracked bootstrap README and Node 22 test runtime. */
  @func()
  async qualification(
    @argument({ defaultPath: "/" }) source: Directory,
  ): Promise<string> {
    const checks = `
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

test('selected runtime is Node 22', () => {
  assert.equal(process.versions.node.split('.')[0], '22');
});

test('bootstrap README identifies this repository', () => {
  const readme = readFileSync('/bootstrap/README.md', 'utf8');
  assert.equal(readme.split(/\\r?\\n/)[0], '# factory-dashboard-acceptance-20260915');
  assert.match(readme, /\\[software-factory-onboarding:v1:[^\\]\\r\\n]+\\]/);
});
`;
    return await dag
      .container()
      .from("docker.io/library/node:22-bookworm-slim@sha256:83f487e0a63425e5b4d146fb5e5be574bcbe1b7b843d3ebafdd95eaf7767a7e5")
      .withFile("/bootstrap/README.md", source.file("README.md"))
      .withNewFile("/checks/bootstrap.test.mjs", checks)
      .withExec(["node", "--test", "/checks/bootstrap.test.mjs"])
      .stdout();
  }
}
