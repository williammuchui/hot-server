# mysql-express

To install dependencies:

```bash
bun install
```

To start server:

```bash
bun run index.ts
```

## Generating_API_Auth_Tokens
  
METHOD: POST

```bash
http://localhost:3000/generate-token
```

Request Body of type JSON

```json
{
    "username":"testuser",
}
```

Response:

```json
{
    "token":" eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNzIxNDc1MTg0LCJleHAiOjE3MjE0Nzg3ODR9.s-5E67LYn_dfIg6O-LXO0reSex0OU6R5XHyIK7lsPYE"
}
```

The Token is used in all requests in the Headers Auth Section.
Avoid using apostrophes on the token. (Applies to Insomnia users.)  

```bash
TOKEN: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNzIxNDc1MTg0LCJleHAiOjE3MjE0Nzg3ODR9.s-5E67LYn_dfIg6O-LXO0reSex0OU6R5XHyIK7lsPYE

PREFIX: Bearer
```

## Get_all_customer_records

METHOD: GET

```bash
http://localhost:3000/
```

## Create_new_customer_record

METHOD: POST

```bash
http://localhost:3000/customer
```

Request Body of type JSON

```json
{
    "NAME":"Foo",
    "AGE":35,
    "SALARY": 2500.00,
    "CONTACT": 7328329,
    "ADDRESS": "Mumbai",
}
```

Response:

```json
{
    "message": "Customer created successfully"
}
```

## Get_customer_by_ID

METHOD: GET

To get customer where ID = 1:

```bash
http://localhost:3000/1
```

## Update_Customer_by_ID

METHOD: PATCH

updating customer where ID = 1:

```bash
http://localhost:3000/update/1
```

Request Body of type JSON:

```json
{
    "NAME": "Mike Junior",
    "AGE": 30,
    "SALARY": 2300.00,
    "ADDRESS": "San Francisco",
    "CONTACT": 2343443,
}
```

Response:

```json
{
    "message": "Customer updated successfully"
}
```

## Delete_customer_Record_by_ID

METHOD: DELETE

```bash
http://localhost:3000/8
```

Response:

```json
{
    "message": "Customer deleted successfully"
}
```
