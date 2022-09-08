export function parseHTPasswd(content: string): Record<string, unknown> {
  return content.split(/[\r]?[\n]/).reduce((prev, line) => {
    const [user, pass] = line.split(':').map((s) => s.trim());
    if (user && pass) {
      prev[user] = pass;
    }
    return prev;
  }, {} as Record<string, unknown>);
}
