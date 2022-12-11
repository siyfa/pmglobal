# Test

PMGlobalTechnology

### Version
1.0.0

## Usage

### Installation

Install the dependencies

```sh
$ npm install
```

### Run application

```sh
$ npm run dev
```

### Create new user

### Request

`POST /user/`

    curl -i -H 'Accept: application/json' http://localhost:7000/user/

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

## Filter users

### Request

`GET /users/`

    curl -i -H 'Accept: application/json' -d 'name=Foo&status=new' http://localhost:7000/usersusers?filter_field=firstname&filter_value=john&page=1&sort_order_mode=asc&sort_field:firstname

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36

    Query fields-
    
    -filter_field
    -filter_value
    -page
    -pageSize
    -sort_order_mode
        -asc
        -desc
    -sort_field
        -firstname
        -lastname
        -username
        -gender
        -date_of_birth
        -_id

## Get a user

### Request

`GET /users/id`

    curl -i -H 'Accept: application/json' http://localhost:7000/thing/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 36

## Modify a user

### Request

`PUT /users/id`

    curl -i -H 'Accept: application/json' http://localhost:7000/thing/9999

### Response

    HTTP/1.1 404 Not Found
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 404 Not Found
    Connection: close
    Content-Type: application/json
    Content-Length: 35


## Delete a user

### Request

`DELETE /users/`

    curl -i -H 'Accept: application/json' -d 'name=Bar&junk=rubbish' http://localhost:7000/thing

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/2
    Content-Length: 35

## Login

### Request

`POST /users/login`

    curl -i -H 'Accept: application/json' http://localhost:7000/thing/

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 74


### Author

Siyanbola Faruk

### Version

1.0.0
