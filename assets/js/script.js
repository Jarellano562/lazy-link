var history = {};

var getUrl = function(encodedUrl){
    fetch("https://cleanuri.com/api/v1/shorten", {
        body: "url=https%3A%2F%2Fgoogle.com%2F",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        mode: "no-cors"
      })
      .then(function(response){
          console.log(response.json());
      })
}

var encodeUrl = function(url){
    // write url encode function
    return url;
}

// read data from localstorage
// if data exists, import then append to history section

// accept user input, make request for shortened url
// make request for qr code
// append requested data to history as an object

// display shortened link on page in header
// display qr code in image under header