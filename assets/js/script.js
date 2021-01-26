var history = {};

longUrl = "https://schlocked.com";
shortenedUrl = "";

var getUrl = function(longUrl){
    fetch("https://api-ssl.bitly.com/v4/shorten", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 13d6ed853cd3dd0709742e537be47fb460d48657",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"long_url": longUrl, "domain": "bit.ly"})
      })
      .then(function(response){
        response = response.json();
          return response;
      })
      .then(function(data){
        shortenedUrl = JSON.stringify(data.link);
        console.log(shortenedUrl);
      })
}

getUrl(longUrl);
// read data from localstorage
// if data exists, import then append to history section
var loadData = function(id, qrLink, shortLink){
  // render an item to the history
}

var saveData = function(id, qrLink, shortLink){
  // add an item to the list and save to localstorage
}

var deleteItem = function(id){
  // delete an item from the list and localstorage
}
// accept user input, make request for shortened url
// make request for qr code
// append requested data to history as an object

// display shortened link on page in header
// display qr code in image under header