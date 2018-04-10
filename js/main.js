const geocode = () => {
  const location = '22 Main st Boston MA';
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: location,
      key: 'AIzaSyCZd2Cz07kc5A-9iWKFGZMofjiqRVAx5Go'
    }
  })
  .then((response)=> {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
}

geocode();
