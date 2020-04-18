url = "https://pomber.github.io/covid19/timeseries.json";
    fetch(url)
    .then(response => {
        return response.json();
    })
    .then((data) => {
        
        var obj = data;
        var countries = "";
        var selectPairs = Object.entries(obj);
        console.log(selectPairs);

        for(var k = 0; k < selectPairs.length; k++){
            countries += ' <option id="teste" value="' + selectPairs[k][0] + '">' + selectPairs[k][0] +'</option>';     
           
        }

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
        document.getElementById("dropdown-content").innerHTML = countries;
        document.getElementById('dropdown-content').addEventListener('click', onClickHandler);
        document.getElementById('dropdown-content').addEventListener('mousedown', onMousedownHandler);
 

        window.getCountry = function() {
            var country = document.getElementById("dropdown-content");
            var index = country.selectedIndex;
            console.log(index)
            console.log(country)
            var displayCountry = country.value;
            var objCountry = JSON.parse(JSON.stringify(country))
            document.getElementById("dataBrazil").innerHTML = displayCountry;

            console.log(objCountry)
            const countryDates = data[displayCountry];
            const lastDate = countryDates.length - 1;
            document.getElementById("dateTodayConfirmed").innerHTML = countryDates[lastDate].confirmed;
            document.getElementById("dateTodayRecovered").innerHTML = countryDates[lastDate].recovered;
            document.getElementById("dateTodayDead").innerHTML = countryDates[lastDate].deaths;

            for(var i = 0; i < lastDate; i++){
                var todayCases = countryDates[lastDate].confirmed - countryDates[i].confirmed;
                document.getElementById("dateTodayCases").innerHTML = todayCases;
            }

            var mortality = ((countryDates[lastDate].deaths/countryDates[lastDate].confirmed)*100).toFixed(2);
            document.getElementById("dateTodayMortality").innerHTML = mortality + "%";
            var activeCases = (countryDates[lastDate].confirmed-(countryDates[lastDate].deaths + countryDates[lastDate].recovered));
            document.getElementById("dateTodayActive").innerHTML = activeCases;
            
        }
      
        var objLength = obj.Brazil.length;
        
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




