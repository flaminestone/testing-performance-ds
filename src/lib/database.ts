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
        let user = this.db.get('users').find({username: result.username});
        if (!user.value()) {
            this.db.get('users').push({username: result.username, files: [{filename:result.filename, time: [result.time]}]}).write();
            user = this.db.get('users').find({username: result.username});
        }
        let file = user.files.find({filename: result.filename});

        if (!file.value()) {
            user.push({filename:result.filename, time: [result.time]}).write();
            file = user.find({filename: result.filename});
            return;
        }
        file.push()

        if (!this.db.get('users').find({username: result.username}).value()) {
            this.db.get('data').push({username: result.username, filename: result.filename, results: []}).write();
        }
        this.db.get('data').find({username: result.username, filename: result.filename}).get('results').push(result.time).write()

    }

    get_results(data) {

        this.db.get('data').find({username: data.username}).value().forEach(() => {
            console.log('aaaa')
        })
        // console.log(this.db.get('data').find({username: data.username}).value())
        console.log(this.db.get('data').find({username: 'user'}).value())
        return this.db.get('data').find({username: data.username}).value()
    }
}