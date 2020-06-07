url = "https://pomber.github.io/covid19/timeseries.json";

function onMousedownHandler(e) {
    var el = e.currentTarget;

    if (el.hasAttribute("size") && el.getAttribute("size") == "1") {
      e.preventDefault();
    }
  }
  function onClickHandler(e) {
    var el = e.currentTarget;

    if (el.hasAttribute("size") == "1") {
      el.className += "selectOpen";
      el.setAttribute("size", "5");
    } else {
      el.className = "";
      el.setAttribute("size", "1");
    }
  }
  
fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    var obj = data;
    var countries = "";
    var selectPairs = Object.entries(obj);
    console.log(selectPairs);

    for (var k = 0; k < selectPairs.length; k++) {
      countries +=
        ' <option id="teste" value="' +
        selectPairs[k][0] +
        '">' +
        selectPairs[k][0] +
        "</option>";
    }

   
    document.getElementById("dropdown-content").innerHTML = countries;
    document
      .getElementById("dropdown-content")
      .addEventListener("click", onClickHandler);
    document
      .getElementById("dropdown-content")
      .addEventListener("mousedown", onMousedownHandler);

    window.getCountry = function () {
      var country = document.getElementById("dropdown-content");
      var index = country.selectedIndex;
      console.log(index);
      console.log(country);
      var displayCountry = country.value;

      const countryDates = data[displayCountry];
      const lastDate = countryDates.length - 1;
      document.getElementById("countryName").innerHTML = displayCountry;
      document.getElementById("dateTodayConfirmed").innerHTML =
        countryDates[lastDate].confirmed;
      document.getElementById("dateTodayRecovered").innerHTML =
        countryDates[lastDate].recovered;
      document.getElementById("dateTodayDead").innerHTML =
        countryDates[lastDate].deaths;

      for (var i = 0; i < lastDate; i++) {
        var todayCases =
          countryDates[lastDate].confirmed - countryDates[i].confirmed;
        document.getElementById("dateTodayCases").innerHTML = todayCases;
      }

      var mortality = (
        (countryDates[lastDate].deaths / countryDates[lastDate].confirmed) *
        100
      ).toFixed(2);
      document.getElementById("dateTodayMortality").innerHTML = mortality + "%";
      var activeCases =
        countryDates[lastDate].confirmed -
        (countryDates[lastDate].deaths + countryDates[lastDate].recovered);
      document.getElementById("dateTodayActive").innerHTML = activeCases;

      var flag = flags.find((e) => e.name == displayCountry).code.toLowerCase();
      document.getElementById("flag").className = "flag-icon flag-icon-" + flag;

      var chart1 = new CanvasJS.Chart("chartContainer1", {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: displayCountry,
        },
        axisX: {
          valueFormatString: "DD MMM",
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
          },
        },
        axisY: {
          title: "People(CC, RC, DC)",
          crosshair: {
            enabled: true,
          },
        },
        toolTip: {
          shared: true,
        },
        legend: {
          cursor: "pointer",
          verticalAlign: "bottom",
          horizontalAlign: "left",
          dockInsidePlotArea: true,
          itemclick: tooggleDataSeries,
        },
        data: [
          {
            type: "line",
            showInLegend: true,
            name: "CC",
            markerType: "square",
            xValueFormatString: "DD MMM, YYYY",
            color: "blue",
            dataPoints: [
              {
                x: new Date(2020, 04, 22),
                y: countryDates[lastDate].confirmed,
              },
              { x: new Date(2020, 04, 10), y: countryDates[80].confirmed },
              { x: new Date(2020, 04, 01), y: countryDates[70].confirmed },
              { x: new Date(2020, 03, 20), y: countryDates[50].confirmed },
              { x: new Date(2020, 03, 10), y: countryDates[40].confirmed },
              { x: new Date(2020, 03, 01), y: countryDates[30].confirmed },
              { x: new Date(2020, 02, 20), y: countryDates[20].confirmed },
              { x: new Date(2020, 02, 10), y: countryDates[10].confirmed },
              { x: new Date(2020, 02, 01), y: countryDates[5].confirmed },
              { x: new Date(2020, 01, 20), y: countryDates[0].confirmed },
              { x: new Date(2020, 01, 18), y: countryDates[0].confirmed },
              { x: new Date(2020, 01, 17), y: countryDates[0].confirmed },
              { x: new Date(2020, 01, 16), y: countryDates[0].confirmed },
              { x: new Date(2020, 01, 15), y: countryDates[0].confirmed },
            ],
          },
          {
            type: "line",
            showInLegend: true,
            name: "RC",
            lineDashType: "dash",
            dataPoints: [
              {
                x: new Date(2020, 04, 22),
                y: countryDates[lastDate].recovered,
              },
              { x: new Date(2020, 04, 10), y: countryDates[80].recovered },
              { x: new Date(2020, 04, 01), y: countryDates[70].recovered },
              { x: new Date(2020, 03, 20), y: countryDates[50].recovered },
              { x: new Date(2020, 03, 10), y: countryDates[40].recovered },
              { x: new Date(2020, 03, 01), y: countryDates[30].recovered },
              { x: new Date(2020, 02, 20), y: countryDates[20].recovered },
              { x: new Date(2020, 02, 10), y: countryDates[10].recovered },
              { x: new Date(2020, 02, 01), y: countryDates[5].recovered },
              { x: new Date(2020, 01, 20), y: countryDates[0].recovered },
              { x: new Date(2020, 01, 18), y: countryDates[0].recovered },
              { x: new Date(2020, 01, 17), y: countryDates[0].recovered },
              { x: new Date(2020, 01, 16), y: countryDates[0].recovered },
              { x: new Date(2020, 01, 15), y: countryDates[0].recovered },
            ],
          },
          {
            type: "line",
            showInLegend: true,
            name: "DC",
            lineDashType: "dot",
            dataPoints: [
              { x: new Date(2020, 04, 22), y: countryDates[lastDate].deaths },
              { x: new Date(2020, 04, 10), y: countryDates[80].deaths },
              { x: new Date(2020, 04, 01), y: countryDates[70].deaths },
              { x: new Date(2020, 03, 20), y: countryDates[50].deaths },
              { x: new Date(2020, 03, 10), y: countryDates[40].deaths },
              { x: new Date(2020, 03, 01), y: countryDates[30].deaths },
              { x: new Date(2020, 02, 20), y: countryDates[20].deaths },
              { x: new Date(2020, 02, 10), y: countryDates[10].deaths },
              { x: new Date(2020, 02, 01), y: countryDates[5].deaths },
              { x: new Date(2020, 01, 20), y: countryDates[0].deaths },
              { x: new Date(2020, 01, 18), y: countryDates[0].deaths },
              { x: new Date(2020, 01, 17), y: countryDates[0].deaths },
              { x: new Date(2020, 01, 16), y: countryDates[0].deaths },
              { x: new Date(2020, 01, 15), y: countryDates[0].deaths },
            ],
          },
        ],
      });
      chart1.render();
      function tooggleDataSeries(e) {
        if (
          typeof e.dataSeries.visible === "undefined" ||
          e.dataSeries.visible
        ) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        chart1.render();
      }
    };

    window.init = function () {};

    var objLength = obj.Brazil.length;

    var i;
    for (i = 0; i < objLength; i++) {
      var j;
      for (j = 0; j < i; j++) {
        obj.Brazil[i].todayCases =
          obj.Brazil[i].confirmed - obj.Brazil[j].confirmed;
        document.getElementById("dateTodayCases").innerHTML =
          obj.Brazil[i].todayCases;
      }

      obj.Brazil[i].active =
        obj.Brazil[i].confirmed -
        (obj.Brazil[i].deaths + obj.Brazil[i].recovered);
      obj.Brazil[i].mortality = (
        (obj.Brazil[i].deaths / obj.Brazil[i].confirmed) *
        100
      ).toFixed(2);
      console.log(obj.Brazil[i].mortality);
      document.getElementById("dateToday").innerHTML = obj.Brazil[i].date;
      document.getElementById("dateTodayActive").innerHTML =
        obj.Brazil[i].active;
      document.getElementById("dateTodayDead").innerHTML = obj.Brazil[i].deaths;
      document.getElementById("dateTodayRecovered").innerHTML =
        obj.Brazil[i].recovered;
      document.getElementById("dateTodayConfirmed").innerHTML =
        obj.Brazil[i].confirmed;
      document.getElementById("dateTodayMortality").innerHTML =
        obj.Brazil[i].mortality + "%";
    }

    window.onload = function () {
      const USData = data.US;
      const BrazilData = data.Brazil;
      const SpainData = data.Spain;
      const ItalyData = data.Italy;
      const GermanyData = data.Germany;
      const UKData = data["United Kingdom"];
      const FranceData = data.France;
      const TurkeyData = data.Turkey;
      const IranData = data.Iran;
      const lastDate = USData.length - 1;
      const lastDate10 = USData.length - 10;

      var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        title: {
          text: "Top COVID-19 Countries",
        },
        axisY: {
          title: "People(CC,RC, DC)",
          titleFontColor: "#4F81BC",
          lineColor: "#4F81BC",
          labelFontColor: "#4F81BC",
          tickColor: "#4F81BC",
        },
        axisY1: {
          title: "People(RC)",
        },
        axisY2: {
          title: "People(DC)",
        },

        tooTip: {
          shared: true,
        },
        legend: {
          cursor: "pointer",
          itemclick: toggleDataSeries,
        },

        data: [
          {
            type: "column",
            showInLegend: true,
            legendText: "CC = confirmed cases",

            dataPoints: [
              { y: USData[lastDate].confirmed, label: "US" },
              { y: BrazilData[lastDate].confirmed, label: "Brazil" },
              { y: SpainData[lastDate].confirmed, label: "Spain" },
              { y: ItalyData[lastDate].confirmed, label: "Italy" },
              { y: GermanyData[lastDate].confirmed, label: "Germany" },
              { y: UKData[lastDate].confirmed, label: "United Kingdom" },
              { y: FranceData[lastDate].confirmed, label: "France" },
              { y: TurkeyData[lastDate].confirmed, label: "Turkey" },
              { y: IranData[lastDate].confirmed, label: "Iran" },
            ],
          },
          {
            type: "column",
            name: "People(RC)",
            legendText: "RC = Recovered cases",
            showInLegend: true,

            dataPoints: [
              { y: USData[lastDate].recovered, label: "US" },
              { y: BrazilData[lastDate].recovered, label: "Brazil" },
              { y: SpainData[lastDate].recovered, label: "Spain" },
              { y: ItalyData[lastDate].recovered, label: "Italy" },
              { y: GermanyData[lastDate].recovered, label: "Germany" },
              { y: UKData[lastDate].recovered, label: "United Kingdom" },
              { y: FranceData[lastDate].recovered, label: "France" },
              { y: TurkeyData[lastDate].recovered, label: "Turkey" },
              { y: IranData[lastDate].recovered, label: "Iran" },
            ],
          },
          {
            type: "column",
            name: "People(DC)",
            legendText: "DC = Death cases",
            showInLegend: true,

            dataPoints: [
              { y: USData[lastDate].deaths, label: "US" },
              { y: BrazilData[lastDate].deaths, label: "Brazil" },
              { y: SpainData[lastDate].deaths, label: "Spain" },
              { y: ItalyData[lastDate].deaths, label: "Italy" },
              { y: GermanyData[lastDate].deaths, label: "Germany" },
              { y: UKData[lastDate].deaths, label: "United Kingdom" },
              { y: FranceData[lastDate].deaths, label: "France" },
              { y: TurkeyData[lastDate].deaths, label: "Turkey" },
              { y: IranData[lastDate].deaths, label: "Iran" },
            ],
          },
        ],
      });

      chart.render();
      function toggleDataSeries(e) {
        if (
          typeof e.dataSeries.visible === "undefined" ||
          e.dataSeries.visible
        ) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        chart.render();
      }
    };
  })
  .catch((err) => {
    console.log(err);
  });
