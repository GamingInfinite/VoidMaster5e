// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "@font-face {\n  font-family: 'Roboto Condensed';\n  font-style: normal;\n  font-weight: 400;\n  font-display: swap;\n  src: url(https://fonts.gstatic.com/s/robotocondensed/v19/ieVl2ZhZI2eCN5jzbjEETS9weq8-59U.ttf) format('truetype');\n}\n@font-face {\n  font-family: 'Cinzel';\n  font-style: normal;\n  font-weight: 500;\n  font-display: swap;\n  src: url(https://fonts.gstatic.com/s/cinzel/v11/8vIU7ww63mVu7gtR-kwKxNvkNOjw-uTnTYo.ttf) format('truetype');\n}\n.player-wrapper {\n  width: 400px;\n  height: 100px;\n  background-color: #1b2836;\n  border-radius: 20px;\n  align-items: center;\n}\n.player-wrapper .avatar {\n  position: relative;\n  width: 50px;\n  height: 50px;\n  margin-left: 20px;\n  margin-right: 20px;\n}\n.player-wrapper .avatar .avatarImage {\n  width: 50px;\n  height: 50px;\n}\n.player-wrapper .info {\n  position: relative;\n  font-family: Cinzel, serif;\n  display: inline !important;\n  height: 100%;\n}\n.player-wrapper .info .cardTitle {\n  margin-top: 0px;\n  font-size: 1.5rem;\n  display: inline-block;\n}\n.player-wrapper .info .cardBody {\n  display: inline;\n}\n.player-wrapper .info .cardStats {\n  display: inline-block;\n  position: relative;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}