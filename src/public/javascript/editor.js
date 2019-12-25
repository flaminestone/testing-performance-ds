class Editor {
    constructor(option = {}) {
        this.callback = option.callback;
        this.userName = option.username;
        window.time = 0;
        this.time_tmp = 0;
    }

    onDocumentReady() {
        window.time = performance.now() - this.time_tmp;
        window.instance.destroyEditor();
    }

    onAppReady() {
        this.time_tmp = performance.now();
    };

    get_time(timeout) {
        return new Promise((resolve, reject) => {
            let timerId = setInterval(() => {
                if (window.time > 0) {
                    resolve(window.time)
                }
            }, 500);
            setTimeout(() => {
                clearInterval(timerId);
                reject('not ok')
            }, timeout);
        })
    }

    open(filename) {
        window.time = 0;
        this.time_tmp = 0;
        const config = {
            events: {
                "onDocumentReady": this.onDocumentReady,
                "onAppReady": this.onAppReady,
            },
            documentType: 'text',
            document: {
                fileType: "docx",
                url: this.callback + "/public/documents/" + filename,
            },
            editorConfig: {
                mode: 'edit',
                callbackUrl: this.callback + '/callback' + '&filename=' + filename,
                user: {
                    name: this.userName
                }
            },
        };
        window.instance = new DocsAPI.DocEditor("editor_frame", config);
    }

    open_and_wait(filename, key) {
        window.time = 0;
        this.time_tmp = 0;
        const config = {
            documentType: 'text',
            document: {
                fileType: "docx",
                url: this.callback + "/public/documents/" + filename,
            },
            editorConfig: {
                mode: 'edit',
                callbackUrl: this.callback + '/callback',
                user: {
                    name: this.userName
                },
                plugins: {
                    autostart: [
                        "asc.{9616f139-6386-4e50-83bb-3dad84938ddd}"
                    ],
                    pluginsData: [
                        "https://onlyoffice-plugins.s3.us-east-2.amazonaws.com/random-borders/config.json"
                    ]
                },
            },
        };
        if (key) {
            config['document']['key'] = key
        }

        if (this.userName) {
            config['editorConfig']['user'] = {"name": this.userName}
        }
        window.instance = new DocsAPI.DocEditor("editor_frame", config);
    }

    open_by_link(link, log) {
        window.time = 0;
        this.time_tmp = 0;
        const config = {
            events: {
                "onDocumentReady": this.onDocumentReady,
                "onAppReady": this.onAppReady,
            },
            documentType: 'text',
            document: {
                fileType: "docx",
                url: link,
            },
            editorConfig: {
                mode: 'edit',
                callbackUrl: this.callback + '/callback' + '&log=' + log,
                user: {
                    name: this.userName
                }
            },
        };
        window.instance = new DocsAPI.DocEditor("editor_frame", config);
    }
}
