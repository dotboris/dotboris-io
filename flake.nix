{
  description = "Dev Environment";

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
      pkgs = import nixpkgs {inherit system;};
    in {
      formatter = pkgs.alejandra;

      devShells.default = pkgs.mkShell {
        packages = [
          pkgs.nodejs_18
          pkgs.nodePackages.pnpm

          pkgs.vips # required for sharp npm module
        ];
      };
    });
}
