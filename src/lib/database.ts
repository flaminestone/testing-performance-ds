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
        this.db.defaults({ results: []}).write();
    }

    add_result(result: Result) {
        this.db.get('results')
            .push(result)
            .write()
    }
}