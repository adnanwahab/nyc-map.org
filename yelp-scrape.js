'use strict'

const yelp = require('yelp-fusion')
const client = yelp.client(
  '0QCQsubRVAbIPNJFPBVSb-Ykx6rrYUZnYhD4d8wHJqK-fsVpawFkD5hdG54i2qrRUE7M_rcAv3m63xPK6VGUb5MSpR0PtuaCC75KNq8Yd-cHc0Z_85UxaRV_OQQGYHYx'
)

client
  .search({
    term: 'blue bottle coffee',
    location: 'new york',
  })
  .then((response) => {
    console.log(response.jsonBody.businesses)
  })
  .catch((e) => {
    console.log(e)
  })
