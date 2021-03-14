const MongoClient = require('mongodb').MongoClient

const url = 'mongodb+srv://poop:poop@cluster0.rucmp.mongodb.net/test?retryWrites=true&w=majority'

const client = new MongoClient(url, { useUnifiedTopology: true })

const projection = {
//   accommodates: "2"
// amenities: "["Hot water", "Extra pillows and blankets", "Oven", "Cleaning before checkout", "Iron", "Long term stays allowed", "TV", "Baking sheet", "Wifi", "Refrigerator", "Dedicated workspace", "Air conditioning", "Ethernet connection", "Keypad", "Free street parking", "Smoke alarm", "Bathtub", "Heating", "Dishes and silverware", "Fire extinguisher", "Essentials", "Paid parking off premises", "Bed linens", "Hair dryer", "Coffee maker", "Cooking basics", "Luggage dropoff allowed", "Stove", "Hangers", "Kitchen", "Carbon monoxide alarm"]"
// availability_30: "30"
// availability_60: "60"
// availability_90: "90"
// availability_365: "365"
// bathrooms: ""
// bathrooms_text: "1 bath"
// bedrooms: ""
// beds: "1"
// calculated_host_listings_count: "2"
// calculated_host_listings_count_entire_homes: "2"
// calculated_host_listings_count_private_rooms: "0"
// calculated_host_listings_count_shared_rooms: "0"
// calendar_last_scraped: "2020-12-11"
// calendar_updated: ""
// first_review: "2009-11-21"
// has_availability: "t"
// host_about: "A New Yorker since 2000! My passion is creating beautiful, unique spaces where unforgettable memories are made. It's my pleasure to host people from around the world and meet new faces. Welcome travelers!
// ↵
// ↵I am a Sound Therapy Practitioner and Kundalini Yoga & Meditation teacher. I work with energy and sound for relaxation and healing, using Symphonic gong, singing bowls, tuning forks, drums, voice and other instruments."
// host_acceptance_rate: "25%"
// host_has_profile_pic: "t"
// host_id: "2845"
// host_identity_verified: "t"
// host_is_superhost: "f"
// host_listings_count: "6"
// host_location: "New York, New York, United States"
// host_name: "Jennifer"
// host_neighbourhood: "Midtown"
// host_picture_url: "https://a0.muscache.com/im/pictures/user/50fc57af-a6a3-4e88-8f16-efd6cac7c9bc.jpg?aki_policy=profile_x_medium"
// host_response_rate: "92%"
// host_response_time: "within a few hours"
// host_since: "2008-09-09"
// host_thumbnail_url: "https://a0.muscache.com/im/pictures/user/50fc57af-a6a3-4e88-8f16-efd6cac7c9bc.jpg?aki_policy=profile_small"
// host_total_listings_count: "6"
// host_url: "https://www.airbnb.com/users/show/2845"
// host_verifications: "['email', 'phone', 'reviews', 'offline_government_id', 'kba', 'selfie', 'government_id', 'identity_manual', 'work_email']"
// id: "2595"
// instant_bookable: "f"
// last_review: "2019-11-04"
// last_scraped: "2020-12-11"
latitude: 1,
// license: ""
// listing_url: "https://www.airbnb.com/rooms/2595"
longitude: 1,
// maximum_maximum_nights: "1125"
// maximum_minimum_nights: "30"
// maximum_nights: "1125"
// maximum_nights_avg_ntm: "1125.0"
// minimum_maximum_nights: "1125"
// minimum_minimum_nights: "30"
// minimum_nights: "30"
// minimum_nights_avg_ntm: "30.0"
//neighborhood_overview: "Centrally located in the heart of Manhattan just a few blocks from all subway connections in the very desirable Midtown location a few minutes walk to Times Square, the Theater District, Bryant Park and Herald Square."
// neighbourhood: "New York, United States"
// neighbourhood_cleansed: "Midtown"
// neighbourhood_group_cleansed: "Manhattan"
// number_of_reviews: "48"
// number_of_reviews_l30d: "0"
// number_of_reviews_ltm: "0"
name: 1,

picture_url: 1,
review_scores_rating: "94",
price: 1,
description: 1,

// property_type: "Entire apartment"
// review_scores_accuracy: "9"
// review_scores_checkin: "10"
// review_scores_cleanliness: "9"
// review_scores_communication: "10"
// review_scores_location: "10"

// review_scores_value: "9"
// reviews_per_month: "0.36"
// room_type: "Entire home/apt"
// scrape_id: "20201210194816"
_id: 0
}

export const handler = async (event, context) => {

  console.log('GRABBING LISTINGS FROM MONGO')

  const query = event.body
  // connect to your cluster
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  // specify the DB's name
  const db = client.db('test') // execute find query

  const items = await db.collection('airbnb_listings').find({})
  .limit(1e3)
  .project(projection)
  //.limit(500)
  .toArray()
  // TODO only return the bare minimum we need to render (no mongo _id, no health inspection data )
  // console.log(items)
  // close connection
  client.close()

  return {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: 200,
    body: JSON.stringify(items)
  }
}
