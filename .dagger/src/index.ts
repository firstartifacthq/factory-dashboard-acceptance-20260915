import { dag, Directory, func, object } from "@dagger.io/dagger"

@object()
export class FactoryBootstrap {
  /** Qualify only the README bootstrap and Node 22, not future application behavior. */
  @func()
  async qualification(source: Directory): Promise<string> {
    return dag
      .container()
      .from("docker.io/library/node:22-bookworm-slim@sha256:83f487e0a63425e5b4d146fb5e5be574bcbe1b7b843d3ebafdd95eaf7767a7e5")
      .withFile("/bootstrap/README.md", source.file("README.md"))
      .withFile("/checks/bootstrap.test.cjs", source.file(".dagger/checks/bootstrap.test.cjs"))
      .withWorkdir("/bootstrap")
      .withExec(["node", "--test", "/checks/bootstrap.test.cjs"])
      .stdout()
  }
}
