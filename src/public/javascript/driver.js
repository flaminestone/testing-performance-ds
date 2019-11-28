
class Driver {

    constructor(editor, option = {}) {
        this.editor = editor;
        this.files = option.files || [];
        this.option = option;
        this.results = {};
    }
    async open_all() {
        this.results = {};
        for (let i = 0; i < this.files.length; i++) {
            const file = this.files[i];
            console.log('Open file ' + file);
            this.editor.open(file);
            let time = await this.editor.get_time(60000);
            this.send_result({ username: this.editor.userName, time: Math.round(time), filename: file })
        }
    }

    async open_with_generate(case_name) {
        return this.generate_document(this.option.start_from).then((result) => {
            let fileurl = JSON.parse(result)['fileurl'];
            this.editor.open_by_link(fileurl);
            return this.editor.get_time(60000);
        }).then(time => {
            console.log(this.editor);
            log( ' = ' + time + "\n");
            this.send_result({ username: this.editor.userName, time: Math.round(time), case: case_name, counter: this.option.start_from });
            this.option.start_from = +this.option.start_from + 1;
            counter_change(this.option.start_from)
        });
    }

    generate_document(counter) {
        log(this.option.case + ' [' + counter + ']');
        return new Promise((succeed) => {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", '/generate' +  '&counter=' + counter, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({case: this.option.case, counter: counter}));
            xhr.onreadystatechange = (e) => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    succeed(xhr.responseText)
                }
            }
        })
    }

    send_result(data) {
        console.log('send_result')
        console.log(data)
        Database.send_result(data)
    }
}
