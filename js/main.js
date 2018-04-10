// Function to build map
const initMap = (lat, lng) => {
  // Option for map
  const options = {
    zoom: 7,
    center: {lat, lng}
  }

  // Create map
  const map = new google.maps.Map(document.getElementById('map'), options);

  // Add a marker on map
  const marker = new google.maps.Marker({
    position:{lat, lng},
    map
  });
}

const geocode = (e) => {
  // Prevent page from reloading
  e.preventDefault();

  //Get location from form
  const location = document.getElementById('location-input').value;

  // Axios request to google geolocation api
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: location,
      key: 'AIzaSyCZd2Cz07kc5A-9iWKFGZMofjiqRVAx5Go'
    }
  })
  // Handle response from api
  .then((response)=> {
    // Format and output full address
    const formatedAddress = response.data.results[0].formatted_address;
    const formattedAdressOutput = `
      <ul class="list-group">
        <li class="list-group-item">${formatedAddress}</li>
      </ul>`;
    document.getElementById("formatted-address").innerHTML = formattedAdressOutput;
    // -----

    // Format and output main data
    const addressComponents = response.data.results[0].address_components;
    let addressComponentsOutput = '<ul class="list-group">'
    addressComponents.forEach((item, index) => {
      addressComponentsOutput += `
        <li class="list-group-item">
          <strong>${addressComponents[index].types[0]}</strong>: ${addressComponents[index].long_name}
        </li>`;
    })
    addressComponentsOutput += '</ul>'
    document.getElementById("address-components").innerHTML = addressComponentsOutput;
    // -----

    // Format and output location geometry lat and lng
    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    const geometryOutput = `
      <ul class="list-group">
        <li class="list-group-item"><strong>Latitude:</strong> ${lat}</li>
        <li class="list-group-item"><strong>Longitude:</strong> ${lng}</li>
      </ul>`;
    document.getElementById("geometry").innerHTML = geometryOutput;
    // -----

    // Init google map
    initMap(lat, lng);
  })
  .catch((error) => {
    console.log(error);
  });
}

// listen for form sibmit event
const locationForm = document.getElementById('location-form');
locationForm.addEventListener('submit', geocode);
