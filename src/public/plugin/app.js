window.Asc.plugin.init = async function () {
  let j = 0;
  console.log(window.Asc.plugin.info.userName)

for (let i = 0; i < 100; i) {
    await write();
}
  
  function write() {
    j += 1;
    console.error(j);
    return new Promise(resolve => {
      window.Asc.plugin.callCommand(function () {
        var oDocument = Api.GetDocument();
        var oParagraph, oParaPr;
        var oParaStyle = oDocument.GetDefaultStyle("paragraph");
        oParagraph = oDocument.GetElement(Math.floor(Math.random() * 141));
        oParagraph.SetStyle(oParaStyle);
        oParaPr = oParagraph.GetParaPr();
        oParaPr.SetJc("both");
        oParaPr.SetIndFirstLine(720);
        const r = Math.floor(Math.random() * 254);
        const g = Math.floor(Math.random() * 254);
        const b = Math.floor(Math.random() * 254);

        oParaPr.SetBottomBorder("single", 24, 0, r, g, b);
        oParaPr.SetBetweenBorder("single", 24, 0, r, g, b);
        oParaPr.SetLeftBorder("single", 24, 0, r, g, b);
        oParaPr.SetTopBorder("single", 24, 0, r, g, b);




      }, false, '',  function () {

          let xhr = new XMLHttpRequest();
          xhr.open("POST", 'http://192.168.3.195:8000/open/activity', true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify({ username: window.Asc.plugin.info.userName}));
        setTimeout(() => resolve(), 200);
      });
    })
  }
};
