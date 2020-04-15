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
        var i;
        for(i= 0; i < objLength; i++){
            var j;
            for(j = 0; j < i; j++){
                obj.Brazil[i].todayCases = (obj.Brazil[i].confirmed - (obj.Brazil[j].confirmed));
                document.getElementById("dateTodayCases").innerHTML = obj.Brazil[i].todayCases;

            }
            
            obj.Brazil[i].active = (obj.Brazil[i].confirmed -(obj.Brazil[i].deaths + obj.Brazil[i].recovered));
            obj.Brazil[i].mortality = ((obj.Brazil[i].deaths)/(obj.Brazil[i].confirmed)*100).toFixed(2);
            console.log(obj.Brazil[i].mortality);
            document.getElementById("dateToday").innerHTML = obj.Brazil[i].date;
            document.getElementById("dateTodayActive").innerHTML = obj.Brazil[i].active;
            document.getElementById("dateTodayDead").innerHTML = obj.Brazil[i].deaths;
            document.getElementById("dateTodayRecovered").innerHTML = obj.Brazil[i].recovered;
            document.getElementById("dateTodayConfirmed").innerHTML = obj.Brazil[i].confirmed;
            document.getElementById("dateTodayMortality").innerHTML = obj.Brazil[i].mortality + "%";
        }

    })
    .catch((err) => {
        console.log(err)

    })




