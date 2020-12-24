/**
 * utility method
 * https://stackoverflow.com/a/35385518/104380
 * @param  {String} s [HTML string]
 * @return {Object}   [DOM node]
 */
export default function( s ){
  var parser = new DOMParser(),
      node   = parser.parseFromString(s.trim(), "text/html");

  return node.body.firstElementChild;
}