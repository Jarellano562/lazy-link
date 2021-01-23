fetch("https://tastedive.com/api/similar?q=red+hot+chili+peppers%2C+pulp+fiction&k=400114-MusicPro-Q1XD5CRD", {
    mode: "no-cors"
})
.then(function(response){
    console.log(response);
})