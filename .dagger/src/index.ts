import { dag, Directory, func, object } from "@dagger.io/dagger";

@object()
export class Bootstrap {
  /** Check only the admitted bootstrap scope, not the future greeting CLI. */
  @func()
  async qualification(source: Directory): Promise<string> {
    return await dag
      .container()
      .from("node:22.22.0-bookworm-slim")
      .withDirectory("/bootstrap", source)
      .withWorkdir("/bootstrap")
      .withExec(["node", "--test", ".dagger/checks/bootstrap.test.mjs"])
      .stdout();
  }
}
