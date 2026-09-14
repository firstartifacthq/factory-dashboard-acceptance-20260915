{ pkgs, ... }:
{
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_22;
  };

  # CLI bootstrap: no services, persistent state, or migrations.
  # Omitting secretspec.toml leaves SecretSpec integration disabled.
}
