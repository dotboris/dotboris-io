{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      overlays = [
        (final: prev: {
          nodejs = prev.nodejs_24;
        })
      ];
      pkgs = import nixpkgs {inherit system overlays;};
    in {
      formatter = pkgs.alejandra;
      checks = {
        alejandra =
          pkgs.runCommand "alejandra" {
            buildInputs = [pkgs.alejandra];
          } ''
            alejandra -c ${./.}
            mkdir $out
          '';
      };
      devShells.default = pkgs.mkShell {
        packages = [
          pkgs.nodejs

          # Provides packages managers (pnpm / yarn based on `package.json`)
          pkgs.corepack

          # Needed to build the `sharp` dependency
          pkgs.vips
        ];
      };
    });
}
