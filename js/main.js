const geocode = () => {
  const location = '22 Main st Boston MA';
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
    document.getElementById("formatted-address").innerHTML = formattedAdressOutput;
  })
  .catch((error) => {
    console.log(error);
  });
}

geocode();
