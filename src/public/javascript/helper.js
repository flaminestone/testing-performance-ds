function htmlDecode(input){
    let e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

function reformat_results(results) {
    let averagedResults = [];
    JSON.parse(results).files.forEach(x => {
        averagedResults.push({filename: x.filename,
            count: x.time.length,
            average: x.time.reduce((a,b) => a + b, 0) / x.time.length,
            max: Math.max(...x.time),
            min: Math.min(...x.time)})
    });
    JSON.parse(results).cases.forEach(x => {
        let max_result = x.result.map(x => x.counter);
        averagedResults.push({filename: x.casename,
            counter_min: Math.min(...x.result.map(x => x.counter)),
            counter_max: Math.max(...x.result.map(x => x.counter))
        })
    });
    return averagedResults;
}

function log(data) {
    let element = document.getElementById('log-element')
    element.innerHTML += data
}

function log_clear() {
    document.getElementById('log-element').innerHTML = ''
}
function counter_change(counter) {
    document.getElementById('start_from').value = counter
}