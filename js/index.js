

    url = "https://pomber.github.io/covid19/timeseries.json";
    fetch(url)
    .then(response => {
        return response.json();
    })
    .then((data) => {
        //document.getElementById("data").innerText =  JSON.stringify(data);
        //document.getElementById("dataBrazil").innerText = JSON.stringify(data["Brazil"]);
        var obj = JSON.parse(JSON.stringify(data));
        var objLength = obj.Brazil.length;

        console.log(obj.Brazil.length);
        
        for(var i= 0; i <= objLength; i++){
            document.getElementById("dateToday").innerHTML = obj.Brazil[i].date;
            document.getElementById("dateTodayDead").innerHTML = obj.Brazil[i].deaths;
            document.getElementById("dateTodayRecovered").innerHTML = obj.Brazil[i].recovered;
            document.getElementById("dateTodayConfirmed").innerHTML = obj.Brazil[i].confirmed;

        }

    })
    .catch((err) => {
        console.log(err)

    })




