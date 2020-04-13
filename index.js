

    url = "https://pomber.github.io/covid19/timeseries.json";
    fetch(url)
    .then(response => {
        return response.json();
    })
    .then((data) => {
        document.getElementById("data").innerText =  JSON.stringify(data);
        console.log(data["Brazil"])
    })
    .catch((err) => {
        console.log(err)

    })




