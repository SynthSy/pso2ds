function shorten(url) {
  return new Promise((resolve, reject) => {
    gapi.load('client', _ => {
      gapi.client.init({
        'apiKey': v,
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/urlshortener/v1/rest'],
      })
        .then(_ => gapi.client.urlshortener.url.insert({
          longUrl: url
        }))
        .then(resolve, reject)
    });
  });
}
function expanden(url) {
  return new Promise((resolve, reject) => {
    gapi.load('client', _ => {
      gapi.client.init({
        'apiKey': v,
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/urlshortener/v1/url'],
      })
        .then(_ => gapi.client.urlshortener.url.get({
          shortUrl: url
        }))
        .then(resolve, reject)
    });
  });
}