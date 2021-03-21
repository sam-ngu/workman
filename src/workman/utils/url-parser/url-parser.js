const parseurl = require('parseurl')

function parseUrlParams(urlTemplate, actualUrl) {
//    parse dynamic url param
//    return an obj that looks like:

    //template look something like:
    // /api/v1/trades/:id/:name
    const template = parseurl(new Request(urlTemplate));
    const url = parseurl(new Request(actualUrl));
    const actualPathName = url.pathname;
    const templatePathName = template.pathname;

    const uris = templatePathName.split('/');
    const actualUris = actualPathName.split('/');

    const params = {};
    for (let i = 0; i < uris.length; i++) {
        const uri = uris[i];
        if(uri.slice(0,1) !== ':'){
            continue;
        }
        // setting params property to actual url value
        params[uri.slice(1)] = actualUris[i];

    }

    return params
}



export {
    parseUrlParams
}