const request = require("request");

const options = {
    url: 'https://icanhazdadjoke.com/search?term=hipster',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    }
};
let vars = "search_term"
request(options, function(err,res,body){
    let response_json = JSON.parse(body)
    console.log(response_json)
});