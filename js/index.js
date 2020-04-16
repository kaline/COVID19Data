url = "https://pomber.github.io/covid19/timeseries.json";
    fetch(url)
    .then(response => {
        return response.json();
    })
    .then((data) => {
        //document.getElementById("data").innerText =  JSON.stringify(data);
        //document.getElementById("dataBrazil").innerText = JSON.stringify(data["Brazil"]);
        var obj = JSON.parse(JSON.stringify(data));

        var country = "";
        var selectPairs = Object.entries(obj);
        console.log(selectPairs);
        for(var k = 0; k < selectPairs.length; k++){
            country += ' <option value="' + selectPairs[k][0] + '">' + selectPairs[k][0] +'</option>';
            
        }
        document.getElementById("dropdown-content").innerHTML = country;
        

       document.getElementById('dropdown-content').addEventListener('click', onClickHandler);
       document.getElementById('dropdown-content').addEventListener('mousedown', onMousedownHandler);

       function onMousedownHandler(e){
           var el = e.currentTarget;

           if(el.hasAttribute('size') && el.getAttribute('size') == '1'){
               e.preventDefault();
           }

       }
       function onClickHandler(e){
           var el = e.currentTarget;

           if(el.hasAttribute('size') == '1'){
               el.className += "selectOpen";
               el.setAttribute('size', '5');
           }else{
               el.className = '';
               el.setAttribute('size', '1');
           }

       }



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




