class Database {
    static send_result(data) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/add_result', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    }

    static get_results(username) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/results', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({username: username}));
    }

}
