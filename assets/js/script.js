var history = {};
var historyContainer = document.querySelector("#history");
var transformForm = document.querySelector("#form");
var idCounter = 0;

var generateLinks = function(event){
    event.preventDefault();
    var inputText = document.querySelector("input[id='url-input']").value;
    var originalLink = validateUrl(inputText);

    var qrLink = getQrCode(originalLink);
    var shortLink = getShortUrl(originalLink);
    console.log(qrLink);
    console.log(originalLink);
    console.log(shortLink);
}

var validateUrl = function(){
    var url = document.getElementById("url-input").value;
    var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");
    if(!protocol_ok){
        newurl = "http://"+url;
        return newurl;
        }else{
            return url;
        }
}

var getShortUrl = function(longUrl){
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

var getQrCode = function(url){
    qrLink = "https://qrtag.net/api/qr.png?url=" + url;
    return qrLink;
}

var renderLinkItems = function(shortLink, qrLink, originalLink){
    // render qr code
    document.getElementById("qr").src = qrLink;
    // render shortened and original link
    document.getElementById("shortlinktext").innerHTML("<a href='" + shortLink + "'>" + shortLink + "</a> (" + originalLink + ")");
}

// read data from localstorage
// if data exists, import then append to history section
var historyDataAdd = function(id, shortLink, qrLink){
  // render an item to the history
}

var saveData = function(id, shortLink, qrLink){
  // add an item to the list and save to localstorage
}

var deleteDataItem = function(id){
  // delete an item from the list and localstorage
}
// accept user input, make request for shortened url
// make request for qr code
// append requested data to history as an object

// display shortened link on page in header
// display qr code in image under header
console.log(transformForm);
transformForm.addEventListener("submit", generateLinks);