function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (var i in uiBathrooms) {
    if (uiBathrooms[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i in uiBHK) {
    if (uiBHK[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function getBalconyValue() {
  var uiBalcony = document.getElementsByName("uiBalcony");
  for (var i in uiBalcony) {
    if (uiBalcony[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1;
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var balcony = getBalconyValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  var url = "http://127.0.0.1:8000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
  // var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  console.log(
    sqft.value,
    bhk,
    bathrooms,
    balcony,
    location.value,
    estPrice.value
  );

  var data = {
    total_sqft: parseFloat(sqft.value),
    bhk: bhk,
    bath: bathrooms,
    balcony: balcony,
    location: location.value,
  };
  //   $.post(
  //     url,
  //     {
  //       total_sqft: parseFloat(sqft.value),
  //       location: location.value,
  //       bhk: bhk,
  //       bath: bathrooms,
  //       balcony: balcony,
  //     },
  //     function (data, status) {
  //       console.log(data.estimated_price);
  //       estPrice.innerHTML =
  //         "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
  //       console.log(status);
  //     }
  //   );
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.estimated_price);
      estPrice.innerHTML =
        "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function onPageLoad() {
  console.log("document loaded");
  var url = "http://127.0.0.1:8000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
  //   var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  $.get(url, function (data, status) {
    console.log("got response for get_location_names request");
    if (data) {
      var locations = data.locations;
      var uiLocations = document.getElementById("uiLocations");
      $("#uiLocations").empty();
      for (var i in locations) {
        var opt = new Option(locations[i]);
        $("#uiLocations").append(opt);
      }
    }
  });
}

window.onload = onPageLoad;
