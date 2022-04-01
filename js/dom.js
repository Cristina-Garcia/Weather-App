export function createDOM(string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(stringContainingHTMLSource, "text/html");
  return HTML.body.firstChild;
  debugger;
}
