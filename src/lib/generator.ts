import fs  from 'fs';
import path from 'path';
import { StringHelper } from './string_helper';

export class Generator {

    static generate_document(option) {
        const file = fs.readFileSync(path.join(__dirname, '../public/scripts', option.case), 'utf-8');
        let filename = option.case + '_' + StringHelper.random();
        let start_line= 'builder.CreateFile("docx");' + "\n" +  'var counter = ' + option.counter + "\n";
        let end_line = 'builder.SaveFile("docx", "SampleText.docx");\n' + 'builder.CloseFile();';
        fs.writeFile(path.join(__dirname, '../public/tmp', filename), start_line + file + end_line, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("File " + filename + " has been created");
        });
        return filename;
    }
}
