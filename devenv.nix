{ pkgs, ... }:
{
  packages = [ pkgs.nodejs_22 ];

  # This CLI bootstrap needs no services, state, initialization, or secrets.
  # SecretSpec remains disabled by omitting secretspec.toml.
}
