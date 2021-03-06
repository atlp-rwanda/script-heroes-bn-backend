[![Build Status](https://travis-ci.org/atlp-rwanda/script-heroes-bn-backend.svg?branch=develop)](https://travis-ci.org/atlp-rwanda/script-heroes-bn-backend) [![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/script-heroes-bn-backend/badge.svg?branch=develop)](https://coveralls.io/github/atlp-rwanda/script-heroes-bn-backend?branch=develop) [![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)

# Barefoot Nomad - Making company travel and accomodation easy and convinient.

## Vision

Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.

This is the swagger API [documentation](https://script-heroes-bn-backend-stgng.herokuapp.com/api-docs/) link

## Heroku backend endpoint

This the heroku staging Api https://script-heroes-bn-backend-stgng.herokuapp.com/

This the production Api https://script-heroes-bn-backend.herokuapp.com/

## Setup Dotenv

- Create .env file in project root directory
- Copy keys in .env-example file, which is in the project root directory and assign values to those keys.
- You can add more environmenta variables to the .env file
- To use declared variables, require dotenv at the top of your file `import dotenv from 'dotenv'` and call its method config `dotenv.config()`
- Access environment variable value by using `process.env.KEY_NAME` where `KEY_NAME` is the variable name.

Note: If you make changes that uses environmental variables make sure to add those variables with example values in the .env.example file.

## Sequelize and Sequelize-cli

### 1 Installing cli

`npm install`

### 2 Running Migrations

`sequelize db:migrate`

### 3 Running Seeds

`sequelize db:seed:all`

## Signup Endpoint

### User Registration Model

```json
{
  "firstName": "name",
  "lastName": "lastName",
  "email": "example@email.com",
  "phoneNumber": "12345678",
  "password": "mypassword"
}
```

### Forgot password

```json
{
  "email": "example@email.com"
}
```

### Reset password

```json
{
  "password": "newPassword",
  "confirmPassword": "newPassword"
}
```

## Profile Page Settings Endpoints

### Complete Profile Model

```
{
gender: DataTypes.STRING,
birthdate: DataTypes.DATE,
language: DataTypes.STRING,
currency: DataTypes.STRING,
country: DataTypes.STRING,
department: DataTypes.STRING,
linemanager: DataTypes.INTEGER
}

```

### Update Profile Model

```
{
firstName: DataTypes.STRING,
lastName: DataTypes.STRING,
phoneNumber: DataTypes.STRING,
gender: DataTypes.STRING,
birthdate: DataTypes.DATE,
language: DataTypes.STRING,
currency: DataTypes.STRING,
country: DataTypes.STRING,
department: DataTypes.STRING,
linemanager: DataTypes.INTEGER
}

```

### Profile Schema

```json
{
  "firstName": "name",
  "lastName": "lastName",
  "email": "example1@email.com",
  "phoneNumber": "12345678",
  "gender": "Male",
  "birthdate": "1978-05-04T00:00:00.000Z",
  "language": "Kinyarwanda",
  "currency": "US$",
  "country": "Rwanda",
  "department": "IT",
  "linemanager": "JOHN Doe"
}
```

### Accommodation model

```json
{
  "facilityName": "facility Name",
  "locationId": 1,
  "description": "Full description of the facility",
  "roomType": "room type",
  "photoUrl": "Url for image"
}
```

### Return & Oneway Trip model

```json
{
  "origin": 1,
  "destination": 3,
  "from": "2020-10-10",
  "till": "2020-10-15",
  "travelReasons": "vacation",
  "accomodationId": 1
}
```

### Host/Supplier Add Accomodation model

```json
{
  "facilityName": "Serena Hotel",
  "description": "nice hotel",
  "locationId": 1,
  "photoUrl": "https://picsum.photos/200/300",
  "roomNumbers": 5,
  "price": 100,
  "services": "restaurent and bar",
  "amenities": "pool game"
}
```

### Endpoints

- Hosted url: https://script-heroes-bn-backend-stgng.herokuapp.com/
- Signup: `/api/auth/signup`
- Login: `/api/auth/login`
- Complete Profile: `/api/profile/complete`
- Display Profile: `/api/profile`
- Update Profile: `/api/profile/update`
- Display Managers: `/api/profile/managers`
- Accomodations: `/api/accomodations`
- Forgot Password: `/api/forgotPassword`
- Trip With Return Date: `/api/trip/return-trip`
- Oneway Trip Request: `/api/trips/oneway`
- Multi city Request: `/api/trips/multi-city`
- POST oneway Trip: `/api/trips/oneway`
- GET ONE oneway Trip: `/api/trips/oneway/:tripId`
- GET ALL oneway Trip: `/api/trips/oneway`
- UPDATE oneway Trip: `/api/trips/oneway/:tripId`
- DELETE oneway Trip: `/api/trips/oneway/:tripId`
- Host Accommodations: `/api/host/accomodations`
- Accomodation like Reaction: `/api/accomodations/like`
- Accomodation unlike Reaction: `/api/accomodations/unlike`
- Get All requests as a manager: `/api/request/manager`
- Make a decision on a request as a manager: `/api/request/manager/:id/:decision`
- Search for Requests by status: `/api/allRequestsByStatus/search?status=status`
- Search for Requests by ID: `/api/getRequestById/search?id=requestId`
- Search for Requests by user ID: `/api/getRequestByUser/search?id=userId`
- Search for Trips by Start date: `/api/allTripsByStartDate/search?startDate=date`
- Search for Trips by End date: `/api/allTripsByEndDate/search?endDate=date`
- Search for Trips by Origin: `/api/allTripsByOrigin/search?origin=country`
- Search for Trips by Destination: `/api/allTripsByDest/search?destination=country`
- Search for Trips by Origin & Dest: `/api/allTripsByOriginDest/search?origin=country&destination=country`
- Most Traveled Destination: `/api/most-traveled/destinations`
- Getting notifications: `/api/api/notifications`
- Counting unseen notification: `/api/api/notifications/count`
- Login With Google: `/users/auth/google`
- Login with Facebook: `/users/auth/google`
- GET all bookings: `/api/accomodations/book`
- POST a booking: `/api/accomodations/book`
- DELETE all bookings: `/api/accomodations/book`
- GET a single booking: `/api/accomodations/book/id`
- DELETE a booking: `/api/accomodations/book/id`
- UPDATE a booking: `/api/accomodations/book/id`
- GET all ratings: `/api/ratings`
- POST a rating: `/api/ratings`
- GET ratings of an accommodation: `/api/ratings/accommodation/accommodationId`
- GET a single rating: `/api/ratings/id`
- DELETE a rating: `/api/ratings/id`
- UPDATE a rating: `/api/ratings/id`
- Barefoot chat: `/api/chat`
