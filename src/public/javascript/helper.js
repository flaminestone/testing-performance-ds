function htmlDecode(input){
    let e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

function reformat_results(results) {
    let averagedResults = [];
    JSON.parse(results).forEach(x => {
        averagedResults.push({filename: x.filename,
            count: x.time.length,
            average: x.time.reduce((a,b) => a + b, 0) / x.time.length,
            max: Math.max(...x.time),
            min: Math.min(...x.time)})
    });
    return averagedResults;
}