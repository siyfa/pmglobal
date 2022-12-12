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

### Server Ip address (No domain name)

```sh
$ 72.55.189.245
```

### Create new user

### Request

`POST 72.55.189.245/users/`

    curl -i -H 'Accept: application/json' 72.55.189.245/users/

    req.body = {
        "username": "test",
        "firstname": "John",
        "lastname": "Doe",
        "gender": "M",
        "password": "pass1234",
        "date_of_birth": "01/06/1990"
        }

### Response

    HTTP/1.1 200 
    Status: 200
    Connection: close
    Content-Type: application/json
    []


## Filter users

### Request

`GET 72.55.189.245/users/`

    curl -i -H 'Accept: application/json' 72.55.189.245/users

    curl -i -H 'Accept: application/json' 72.55.189.245/users?filter_field=firstname&filter_value=john&page=1&sort_order_mode=asc&sort_field=firstname

    req.query -
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

### Response

    HTTP/1.1 200 
    Status: 200 
    Connection: close
    Content-Type: application/json


## Get a user

### Request

`GET 72.55.189.245/users/id`

    curl -i -H 'Accept: application/json' 72.55.189.245/users/{{id}}

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json

## Modify a user

### Request

`PUT 72.55.189.245/users/id`

    curl -i -H 'Accept: application/json' 72.55.189.245/users/{{id}}

### Response

    HTTP/1.1 200
    Status: 200
    Connection: close
    Content-Type: application/json


## Delete a user

### Request

`DELETE 72.55.189.245/users/`

    curl -i -H 'Accept: application/json' 72.55.189.245/users/{{id}}

### Response

    HTTP/1.1 200
    Status: 200
    Connection: close
    Content-Type: application/json

## Login

### Request

`POST 72.55.189.245/users/login`

    curl -i -H 'Accept: application/json' 72.55.189.245/users/login

    req.body = {
        "username": "test",
        "password": "pass1234"
    }
    
### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json

### Author

Siyanbola Faruk

### Version

1.0.0
