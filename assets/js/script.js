var historyContainer = document.querySelector("#history");
var transformForm = document.querySelector("#form");
var idCounter = 0;

// create the qr and shortened url from user input
var generateLinks = function(event){
    event.preventDefault();
    var inputText = document.querySelector("input[id='url-input']").value;
    var originalLink = validateUrl(inputText);
    
    var qrLink = getQrCode(originalLink);
    var shortLink = "";
    getShortUrl(originalLink);
    document.querySelector("input[id='url-input']").value = "";

    // weird workaround for getting the returned value from the bit.ly api response object since i don't know how to use asynchronous functions yet
    setTimeout(function(){
        shortLink = document.getElementById("generation").getAttribute("data-link");
        renderLinkItems(shortLink, qrLink, originalLink);
        saveData(idCounter, shortLink, qrLink, originalLink);
        historyDataAdd(idCounter, shortLink, qrLink, originalLink);
        idCounter++;
    }, 500);
}

// checks whether or not the url starts with the proper http prefix, if not add it
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

// fetch a shortened url from the bit.ly api
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
        shortenedUrl = data.link;
        // used an html data attribute to temporarily store the shortened link to get around using an asynchronous function to retrieve the value
        document.getElementById("generation").setAttribute("data-link", shortenedUrl);
      })
}

// generate the qr code image link to be displayed
var getQrCode = function(url){
    qrLink = "https://qrtag.net/api/qr.png?url=" + url;
    return qrLink;
}

// display the data received
var renderLinkItems = function(shortLink, qrLink, originalLink){
    // render qr code
    document.getElementById("qr").src = qrLink;
    // render shortened and original link
    document.getElementById("shortlinktext").innerHTML = "<a href='" + shortLink + "' target='_blank'>" + shortLink + "</a> (" + originalLink + ")";
}

// create the list item that contains previously generated links and qr codes
var historyDataAdd = function(id, shortLink, qrLink, originalLink){
  var historyEl = document.createElement("li");
  historyEl.className = "history-li";
  historyEl.setAttribute("data-id", id);
  historyEl.setAttribute("data-shortLink", shortLink);
  historyEl.setAttribute("data-qrLink", qrLink);
  historyEl.setAttribute("data-originalLink", originalLink);

  // create the div that will house the info
  var historyInfoEl = document.createElement("div");
  historyInfoEl.className = "history-li-info";
  historyInfoEl.innerHTML = "<h3>" + originalLink + "</h3>";
  historyEl.appendChild(historyInfoEl);

  // create load button
  var historyLoadBtn = document.createElement("button");
  historyLoadBtn.textContent = "Load";
  historyLoadBtn.className = "button is-success";
  historyLoadBtn.setAttribute("id", "loadButton");
  historyLoadBtn.setAttribute("data-id", id);
  historyEl.appendChild(historyLoadBtn);

  // create delete button
  var historyDeleteBtn = document.createElement("button");
  historyDeleteBtn.textContent = "Delete";
  historyDeleteBtn.className = "button is-danger";
  historyDeleteBtn.setAttribute("id", "deleteButton");
  historyDeleteBtn.setAttribute("data-id", id);
  historyEl.appendChild(historyDeleteBtn);

  // add the history to the list
  historyContainer.appendChild(historyEl);
}

// adds a recently converted link to the history and localstorage
var saveData = function(id, shortLink, qrLink, originalLink){
  var dataObj = {
      id: id,
      shortLink: shortLink,
      qrLink: qrLink,
      originalLink: originalLink
  };
  genHistory.push(dataObj);
  localStorage.setItem("genHistory", JSON.stringify(genHistory));
}

// handles the button for deleting a history item
var deleteDataItem = function(event){
  if (event.target.matches("#deleteButton")){
    // remove the list item from the html
    var itemId = parseInt(event.target.getAttribute("data-id"));
    var selectedHistory = document.querySelector("li[data-id='" + itemId + "']")
    selectedHistory.remove();

    // update the localstorage to reflect deleted item
    var updateHistory = [];
    for (var i = 0; i < genHistory.length; i++){
      if (genHistory[i].id !== itemId){
        updateHistory.push(genHistory[i]);
      }
    }
    genHistory = updateHistory;
    localStorage.setItem("genHistory", JSON.stringify(genHistory))
  }
}

var loadHandler = function(event){
  if (event.target.matches("#loadButton")){
    var itemId = parseInt(event.target.getAttribute("data-id"));
    loadLi = document.querySelector("li[data-id='" + itemId + "']");
    loadShort = loadLi.getAttribute("data-shortLink");
    loadQr = loadLi.getAttribute("data-qrLink");
    loadOriginal = loadLi.getAttribute("data-originalLink");
    renderLinkItems(loadShort, loadQr, loadOriginal);
  }
}

// if history exists in localstorage, retrieve it. if not, assign empty array
if (localStorage.getItem("genHistory")){
  var genHistory = JSON.parse(localStorage.getItem("genHistory"));

  // makes sure the id's of the history items start from 0 and ascend in order and add to the html
  for(var i = 0; i < genHistory.length; i++){
    genHistory[i].id = i;
    historyDataAdd(i, genHistory[i].shortLink, genHistory[i].qrLink, genHistory[i].originalLink);
  }
  localStorage.setItem("genHistory", JSON.stringify(genHistory));
  idCounter = genHistory.length;
} else {
  var genHistory = [];
}

transformForm.addEventListener("submit", generateLinks);
historyContainer.addEventListener("click", deleteDataItem);
historyContainer.addEventListener("click", loadHandler);