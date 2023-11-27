export const readArgs = () => {
  const args = process.argv.slice(2);
  if (args.length !== 2) {
    process.exit(0);
  }
  const updateCount = Number.parseInt(args[0]);
  const callCount = Number.parseInt(args[1]);

  return { updateCount, callCount };
};
