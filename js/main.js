const geocode = (e) => {
  e.preventDefault();
  const location = document.getElementById('location-input').value;
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: location,
      key: 'AIzaSyCZd2Cz07kc5A-9iWKFGZMofjiqRVAx5Go'
    }
  })
  .then((response)=> {
    const formatedAddress = response.data.results[0].formatted_address;
    const formattedAdressOutput = `
      <ul class="list-group">
        <li class="list-group-item">${formatedAddress}</li>
      </ul>
    `;
    const addressComponents = response.data.results[0].address_components;

    let addressComponentsOutput = '<ul class="list-group">'

    addressComponents.forEach((item, index) => {
      addressComponentsOutput += `<li class="list-group-item"><strong>${addressComponents[index].types[0]}</strong>: ${addressComponents[index].long_name}</li>`;
    })

    addressComponentsOutput += '</ul>'

    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lat;
    const geometryOutput = `
      <ul class="list-group">
        <li class="list-group-item"><strong>Latitude:</strong> ${lat}</li>
        <li class="list-group-item"><strong>Longitude:</strong> ${lng}</li>
      </ul>
    `;

    document.getElementById("formatted-address").innerHTML = formattedAdressOutput;
    document.getElementById("address-components").innerHTML = addressComponentsOutput;
    document.getElementById("geometry").innerHTML = geometryOutput;
  })
  .catch((error) => {
    console.log(error);
  });
}

const locationForm = document.getElementById('location-form');
locationForm.addEventListener('submit', geocode);
