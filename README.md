### Fastify app to fetch banking data.

## Question

```You need to create a REST service that can fetch bank details, using the data given in the API’s query parameters.

You can use the data available in this repository (https://github.com/snarayanank2/indian_banks) in your backend db. Write your service in any language of your choice. Host it in Heroku - you can signup for a free account in Heroku. E.g. Here are steps on how you can get a django app running in Heroku in a few minutes. Please use PostgreSQL as your backend DB. You may not be able to load the entire dataset in the free tier - you can make do with 10000 rows.

Essentials your applications should have: 
use PostgreSQL as a backend database
GET API to fetch a bank details, given branch IFSC code
GET API to fetch all details of branches, given bank name and a city. This API should also support limit and offset parameters
APIs should be authenticated using a JWT key, with validity = 5 days

Deliverables: 
Hosting URL 
Github repo link to your solution
[ IMPORTANT ] Please include a curl script that makes a call to each of the above mentioned APIs(which includes the JWT key) in your repo while demonstrating the limit and offset parameters
Time taken to complete this exercise

Feel free to reach out to us if you have any questions.
```

## Solution
```
- use Fastify to build the node app.
- bulk data fetching from DB.
```

### API DOC
```
use swagger for API docomentation.

- https://api.srvles.in/documentation
- DB: hosted on heroku
- Data order: From bottom to top
- Data is loaded from https://raw.githubusercontent.com/bhavyanshu/indian-bank-ifsc-branch-database-sql/master/bank_details.sql  
```


### ENV
```
you need to create two `.env` files in your project.

-- development.env
-- production.env

```

### IF you nedd to run it locally/ staging/ production
```
clone the repo and follow this commands.

- npm i
- npm run dev
- npm run build:dev
- npm run build:prod
```
