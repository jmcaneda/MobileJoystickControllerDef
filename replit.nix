
{ pkgs }: {
  deps = [
    pkgs.postgresql
    pkgs.openssl
    pkgs.openssh
  ];
}
