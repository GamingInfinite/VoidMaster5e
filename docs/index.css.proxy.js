// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "@font-face {\n  font-family: 'Roboto Condensed';\n  font-style: normal;\n  font-weight: 400;\n  font-display: swap;\n  src: url(https://fonts.gstatic.com/s/robotocondensed/v19/ieVl2ZhZI2eCN5jzbjEETS9weq8-59U.ttf) format('truetype');\n}\n@font-face {\n  font-family: 'Cinzel';\n  font-style: normal;\n  font-weight: 500;\n  font-display: swap;\n  src: url(https://fonts.gstatic.com/s/cinzel/v11/8vIU7ww63mVu7gtR-kwKxNvkNOjw-uTnTYo.ttf) format('truetype');\n}\nbody {\n  font-family: \"Roboto Condensed\", sans-serif;\n  background-color: #243447;\n  color: #aa0000;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}