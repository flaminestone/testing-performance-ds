class Database {
    static send_result(data) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/add_result', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    }

    static get_results(username) {
        return new Promise((succeed) => {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", '/results', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({username: username}));
            xhr.onreadystatechange = (e) => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    succeed(xhr.responseText)
                }
            }
        })
    }

    static get_userlist() {
        return new Promise((succeed) => {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", '/users', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send();
            xhr.onreadystatechange = (e) => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    succeed(xhr.responseText)
                }
            }
        })
    }
}
