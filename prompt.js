const prompt = require('prompt');
const request = require("request");
const fs = require('fs');

// this is used to select a random index from the array
function randomNumber(min, max) { 
    return Math.random() * (max - min) + min;
} 


prompt.start();

prompt.get(["arg_type"], function (err, result) {
    // arg_type can be search_term or leaderboard
    // The user will have to mention the string (either "searchJoke" or "leaderboard" to specify what they want)
    // once the user types in searchJoke, they will again be prompted to type in the search term for which they want to search the joke

    if (err) { return onErr(err); }
    if(result.arg_type === "searchJoke"){
        prompt.get(["search_term"], function(err,result){
            const options = {
                url: `https://icanhazdadjoke.com/search?term=${result.search_term}`,
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Charset': 'utf-8'
                }
            };
            let vars = "search_term"
            request(options, function(err,res,body){
                let response_json = JSON.parse(body)
                // console.log(response_json.results)
                if(response_json.results.length === 0){
                    console.log("No jokes were found for the entered search term")
                }else{
                    let index = randomNumber(0, response_json.results.length-1)
                    index = Math.floor(index);
                    console.log(response_json.results[index].joke)
                    let rawdata = fs.readFileSync('./jokes.txt');
                    const parsedData = JSON.parse(rawdata);
                    parsedData.push(response_json.results[index])
                    // console.log(parsedData)
                    fs.writeFile('jokes.txt', JSON.stringify(parsedData), (err) => {
                        if(err) console.log(err);
                    })
                }
            });
        })
    }else if(result.arg_type === "leaderboard"){
        let rawdata = fs.readFileSync('./jokes.txt');
        const parsedData = JSON.parse(rawdata);
        // console.log(parsedData)
        let map1 = new Map();
        
        for(let i=0; i<parsedData.length; i++){    
            map1.set(JSON.stringify(parsedData[i].id), 0);
        }
        for(let i=0; i<parsedData.length; i++){    
            map1.set(JSON.stringify(parsedData[i].id), map1.get(JSON.stringify(parsedData[i].id))+1);
        }
        let max = -Infinity;
        let id = "";
        map1.forEach(function(value, key) {
            // console.log(key + ' = ' + value) DEBUGGING
            if(value > max){
                max = value
                id = key
            }
        })
        let count = 0;
        for(let i=0; i<parsedData.length; i++){    
            if(JSON.stringify(parsedData[i].id) === id && count === 0){
                console.log(parsedData[i].joke)
                count++;
            }
        }
        
    }
});

function onErr(err) {
    console.log(err);
    return 1;
}