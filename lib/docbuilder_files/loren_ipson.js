// create document with many of "loren ipson paragraph"
builder.CreateFile("docx");
let oParagraph;
var oDocument = Api.GetDocument();
for (let i = 0; i < Argument["count"]; i++) {
    oParagraph = Api.CreateParagraph();
    oParagraph.AddText("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at erat et tortor gravida malesuada id id ligula. Sed tristique mollis sem ut congue. Duis rutrum felis quis congue bibendum. Curabitur id purus ac nulla sagittis faucibus ut nec nisi. Cras mollis leo dui, ac feugiat leo vestibulum nec. Pellentesque finibus augue at eros imperdiet placerat. Integer quis neque ut nisi congue consectetur id ut augue. Nam enim eros, suscipit sed posuere at, dignissim in turpis. Etiam imperdiet sapien ut sollicitudin iaculis. Nulla eget erat nec nibh mollis scelerisque ac sed est. Donec non facilisis arcu. Sed luctus eleifend tellus aliquet mattis. Mauris blandit vulputate massa eu luctus. Nullam vel scelerisque turpis.");
    oDocument.Push(oParagraph);
}
builder.SaveFile("docx", "loren_ipson.docx");
builder.CloseFile();
