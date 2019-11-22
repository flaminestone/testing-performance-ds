import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

interface Result {
    username: string,
    filename: string,
    time: number

}

export class Database {
    readonly db: any;
    constructor() {
        this.db = low(new FileSync('db.json'));
        this.db.defaults({ data: []}).write();
    }

    add_result(result: Result) {
        if (!this.db.get('data').find({username: result.username, filename: result.filename}).value()) {
            this.db.get('data').push({username: result.username, filename: result.filename, results: []}).write();
        }
        this.db.get('data').find({username: result.username, filename: result.filename}).get('results').push(result.time).write()

    }

    get_results(username) {
        return this.db.get('data').find({username: username}).values()
    }
}