const baseUrl = 'http://localhost:3001/api/v1/urls'

export const getUrls = () => {
  return fetch(baseUrl)
      .then(response => response.json())
}

export const postNewUrl = (newUrl) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(newUrl)
  };

  return (
    fetch(baseUrl, options)
  );
}
