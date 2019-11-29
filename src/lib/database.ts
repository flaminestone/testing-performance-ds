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
        this.db.defaults({users: []}).write();
    }

    get_user(username) {
        return this.db.get('users').find({username: username});
    }

    add_result(result: Result) {
        if (result['case']) {
            this.add_case_result(result);
        } else {
            this.add_file_result(result);
        }
    }

    add_case_result(result) {
        let user = this.get_user(result.username);
        if (!user.value()) {
            console.log(result.counter)
            this.db.get('users').push({
                username: result.username,
                files: [],
                cases: [{casename: result.case, result: [{counter: result.counter, time: [result.time]}]}]
            }).write();
            return;
        }
        let all_cases = user.get('cases');
        let current_case = all_cases.find({casename: result.case});
        if (current_case.value()) {
            let current_result = current_case.get('result');
            let counter = current_result.find({ counter: result.counter });
            if (counter.value()) {
                counter.get('time').push(result.time).write();
            } else {
                current_result.push({counter: result.counter, time: [result.time]}).write();
            }
        } else {
            current_case.get('result').push(result.time).write();
        }

    }

    add_file_result(result) {
        let user = this.get_user(result.username);
        if (!user.value()) {
            this.db.get('users').push({
                username: result.username,
                files: [{filename: result.filename, time: [result.time]}],
                cases: []
            }).write();
        }
        let file = user.get('files').find({filename: result.filename});
        if (!file.value()) {
            user.get('files').push({filename: result.filename, time: [result.time]}).write();
            return;
        }
        file.get('time').push(result.time).write();
    }

    get_results(username) {
        return this.db.get('users').find({username: username}).get('files').value();
    }

    get_users() {
        let usernames = this.db.get('users').map(element => {
            return {username: element['username']}
        });
        usernames = usernames.filter(element => element['username'] !== undefined);
        return usernames;
    }
}