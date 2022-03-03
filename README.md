## TIL Project

A full stack web application that allows one to keep record of the new things they have learned everyday

### Pre-requisite

1. Install CockroachDB locally
2. create a CockroachDB Serverless account - you will need the db-connection string in order to run this stack (https://www.cockroachlabs.com/docs/cockroachcloud/quickstart.html)

### Setup Database

1. We will use the `infra/initdb.sql` to create the table in the database
2. Inside the terminal, run `cat initdb.sql | cockroach sql --url "<connection-string>"`
3. (Verification Step): running these steps should let you have access to the db

```
khai-dev$ cockroach sql --url "postgresql://<username>:<password>@<url>:26257/til"
khai@<db-url>:26257/til> \dt
  schema_name | table_name | type  | owner | estimated_row_count | locality
--------------+------------+-------+-------+---------------------+-----------
  public      | docs       | table | khai  |                   2 | NULL
(1 row)


Time: 392ms total (execution 27ms / network 365ms)
```

### Run the API

1. Run `cd api && cp .env.example .env` and fill in the DB_CONN_STRING with the db-connection string used in the previous step
2. Run `npm install`
3. Run `npm run start:dev` and you should be able to see `server started at http://localhost:9090`
4. (Verification step): You should see a similar output when running these commands in a new terminal

```
bash-3.2$ curl http://localhost:9090/docs | jq '.'
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1313  100  1313    0     0    611      0  0:00:02  0:00:02 --:--:--   614
[
  {
    "id": "20e6aa10-a1b5-4a48-a940-a6c93bae5e6e",
    "title": "TIL 1",
    "content": "Lorem ipsu...",
    "tags": [
      "A",
      "B",
      "C"
    ],
    "date_created": "2022-03-02T13:00:00.000Z"
  },
  {
    "id": "4582395a-3155-4669-b6f6-d24f7feb6f98",
    "title": "TIL 2",
    "content": "22222 Lorem ip...",
    "tags": [
      "A",
      "D"
    ],
    "date_created": "2022-02-19T13:00:00.000Z"
  }
]
```

### Run the Front End

1. Inside the client directory, run `npm install`
2. Run `cp env.example .env` and change the value if needed
3. Run `npm start`
4. Open http://localhost:3000 in your browser