const fetch = require('isomorphic-fetch');

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=utf-8'
};

const finalOptions = {
    'method': 'GET',
    'headers': headers,
    'cache': 'no-cache'
};

for(let i = 0; i < 200; i++) {
    fetch('http://106.15.93.13/rest/getDocList', finalOptions).then((response) => {
        if (response.status >= 200 && response.status < 400) {
            console.log('success ', i);
        } else {
            console.error('error ', i, response.status);
        }
    }).catch(() => {
        console.error('xhr error ', i);
    });
}
