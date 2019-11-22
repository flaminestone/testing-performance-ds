class Driver {

    constructor(editor, files) {
        this.editor = editor;
        this.files = files;
        this.results = {};
    }
    async open_all() {
        this.results = {};
        for (let i = 0; i < this.files.length; i++) {
            const file = this.files[i];
            console.log('Open file ' + file);
            this.editor.open(file);
            let time = await this.editor.get_time(60000);
            this.send_result({username: this.editor.userName, time: time, filename: file})
        }
    }

    send_result(data) {
        console.log(data)
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/result', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    }

}
