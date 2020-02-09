export function sortScrollbars() {
  if (navigator.appVersion.indexOf("Mac") === -1) {
    document.styleSheets[0].insertRule("body {scrollbar-width: none;}", 0);
    document.styleSheets[0].insertRule("body::-webkit-scrollbar {display: none;}", 0);
  }
}

export default {
  sortScrollbars
};