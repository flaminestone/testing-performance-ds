import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

interface Result {
    username: string,
    filename: string,
    time: number

}

// database structure:
// { users: [{ "username": {filename: [time*]}] }
export class Database {
    readonly db: any;
    constructor() {
        this.db = low(new FileSync('db.json'));
        this.db.defaults({ users: []}).write();
    }

    get_user(username) {
        return this.db.get('users').find({username: username});
    }

    add_result(result: Result) {
        let user = this.get_user(result.username);
        if (!user.value()) {
            this.db.get('users').push({username: result.username, files: [{filename:result.filename, time: [result.time]}]}).write();
            user = this.get_user(result.username);
        }
        let file = user.get('files').find({filename: result.filename});
        if (!file.value()) {
            user.push({filename:result.filename, time: [result.time]}).write();
            file = user.find({filename: result.filename});
            return;
        }
        file.get('time').push(result.time).write();

    }

    get_results(username) {
        return this.db.get('users').find({username: username}).get('files').value();
    }
}