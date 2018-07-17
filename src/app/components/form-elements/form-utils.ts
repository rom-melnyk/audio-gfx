let id = 0;

function getId(prefix) {
  id++;
  return prefix
    ? `${prefix.toString().replace(/[^a-z_]/gi, '_')}-${id}`
    : `${id}`;
}

export { getId };
