import request from 'request';

const settings = require("../settings.json");

export class Builder {

    static build(filename): Promise<JSON> {
        return new Promise(ok => {
            request.post(settings['documentserver'] + '/docbuilder',
                {json: {url: "http://192.168.3.195:8000/public/tmp/" + filename}}, (error, res, body) => {
                    ok(res.body)
                })
        });
    }
}
