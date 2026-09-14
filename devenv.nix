{ pkgs, ... }:
{
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_22;
  };

  # SecretSpec stays disabled by default; this CLI needs no external values.
}
