//THIS IS FOR THE URL SHORTNER 
//THIS SHOULD BE THE INPUT FOR 
//THE URL SHORTER 

var endpoint = document.querySelector ("#url-input");


//THIS FUNCTION WILL TAKE THE 
//VALUE FROM THE INPUT BOX 
//AND RETURN THE VALUE INTO 
//THE VARABLE 
function geturl(){
    var url = document.getElementById("urlinput").value;
    var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");
    if(!protocol_ok){
        newurl = "http://"+url;
        return newurl;
        }else{
            return url;
        }
}
//CREATED A FUNTION 
//THEN I CALLED A RANDOM STRING SO
//THAT IT COULD GIVE IT A VALUE 
function getrandom() {
    var random_string = Math.random().toString(32).substring(2, 5) 
        + 
                        Math.random().toString(32).substring(2, 5);
    return random_string()
}
//USED THE RANDOM FUNTION
//THIS IS GOING TO OUTPUT A STRING
//WITH AN AGRUMENT OF 32 BECAUSE 
//WE NEED THIS IN ORDER TO MAKE THIS 
//A PROPER STRING WHICH IS CUT AND ADDED TOGTHER 


function genhash(){
    if (window.location.hash == ""){
        window.location.hash = getrandom();
    }
}
//THIS FUNCTION IS USED TO CHANGE THE 
//HASH IN THE LOCATION BAR 

//THIS SHOULD BE SENT TO THE ENDPOINT 
//WHERE THEY SHOULD STORE THE LONG URL
// 
function send_request(url) {
    this.url = url;
    $.ajax({
        'url': endpoint + "/" + window.location.hash.substr(1),
        'type': 'POST',
        'data': JSON.stringify(this.url),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
})
}
//THIS IS THE MAIN FUNCTION THAT WILL 
//SHORT THE ACTUAL URL...WE NEED TO 
//FIND A WAY TO STRORE THE URL AND 
//HAVE THE SHORT URL 
function shorturl(){
    var longurl = geturl();
    genhash();
    send_request(longurl);
}

//WE WILL GET THE LONG URL LINK
//TO THE SHORT URL ENTERED INTO 
//THE ADDRESS BAR 
var hashh = window.location.hash.substr(1)

if (window.location.hash != "") {
    $.getJSON(endpoint + "/" + hashh, function (data) {
        data = data["result"];
        if (data != null) {
            window.location.href = data;
        }        
    });
//THIS WILL EXECUTE THE INPUT VALUE 
//OF THE SHORT URL VALUE WHICH IS GOING 
//TO BE STORED INTO THE HASHH VALUE 
}
