window.Asc.plugin.init = async function () {
  let i = 0;
  do {
    await write();

    i += 1;
    console.log(i);
  } while (i > 100);


  function write() {
    i += 1;
    console.log(i);
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
        setTimeout(() => resolve(), 1000);
      });
    })
  }
};