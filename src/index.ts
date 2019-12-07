export function command(argv: Array<string>) {
  console.log(process.cwd());
  console.log(argv);
  console.log(process.env);
}
