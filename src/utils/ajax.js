const install = function(Vue, options = {}) {

    const ajax = function(options) {
        options.type = (options.type || 'GET').toUpperCase();

        let data = [];
        for(let i in options.data){
            data.push(encodeURIComponent(i) +
                '=' + encodeURIComponent(options.data[i]));
        }
        data = data.join('&');

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                const status = xhr.status;
                if (status >= 200 && status < 300) {
                    options.success &&
                    options.success(JSON.parse(xhr.responseText), xhr.responseXML);
                } else {
                    options.error && options.error(status);
                }
            }
        };
        if (options.type === 'GET') {
            xhr.open('GET', options.url + '?' + data, true);
            xhr.setRequestHeader("sessionId",sessionStorage.getItem('sessionId'))
            xhr.send(null);
        }else if (options.type === 'DELETE'){
          xhr.open('DELETE', options.url + '?' + data, true);
          xhr.setRequestHeader("sessionId",sessionStorage.getItem('sessionId'))
          xhr.send(null);
        }else if (options.type === 'PUT'){
          xhr.open('PUT', options.url + '?' + data, true);
          xhr.setRequestHeader("sessionId",sessionStorage.getItem('sessionId'))
          xhr.send(null);
        }
        else if (options.type === 'POST') {
            xhr.open('POST', options.url, true);
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.setRequestHeader("sessionId",sessionStorage.getItem('sessionId'))
            if(sessionStorage.getItem('session')){
                xhr.setRequestHeader('token',sessionStorage.getItem('session'))
            }
            xhr.send(JSON.stringify(options.data));
        }
    };

    const http =  function(parse) {
        ajax({
            "url": parse.url,
            "data" : parse.data,
            "type" : parse.type,
            "success": function(data) {
                parse.success(data)
            },
            "error": function(data) {
                parse.error(data)
            }
        })
    }

    Vue.prototype.$ajax = http
}

export default install
