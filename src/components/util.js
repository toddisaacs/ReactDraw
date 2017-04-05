export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function rectIntersect(rectA, rectB) {
  // Based on the edge comparison discussed here
  // http://stackoverflow.com/questions/306316/determine-if-two-rectangles-overlap-each-other

  return ( rectA.x < (rectB.x + rectB.width) &&
           (rectA.x + rectA.width) > rectB.x &&
           rectA.y < (rectB.y + rectB.height) &&
           (rectA.y + rectA.height) > rectB.y
  );
}