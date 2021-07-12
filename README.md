
## Running Locally
   
1. To Start the next js client       

```bash
cd client
npm run dev 
```

2. To Start apollo server 

```bash
cd server
npm start
```
3. To run unit test

```
npm test
```

4. To run e2e test
```
npm cypress:open
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see next js application.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

Open [http://localhost:4000/graphql](http://localhost:4000/graphql) with your browser to see graphql console. 

## Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
2. Command to build your container and start server : `docker-compose up`. 
3. Command to remove container and associated networks :`docker-compose down`.  
 
## Deploying to Heroku
 
Create pipeline in Heroku and connect to git.

[Click here to view Deployed version](https://demo-profile-list.herokuapp.com/)

## Future enhancements 
 
[Add Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation).

[Add Server-Side Rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering).

Configure logging and monitoring.

[More Security features](https://github.com/jagaapple/next-secure-headers)

[Monorepo](https://dev.to/givehug/next-js-apollo-client-and-server-on-a-single-express-app-55l6)

## Further reading  

[Advance react hooks](https://github.com/kentcdodds/advanced-react-hooks/tree/main/src/exercise)

[Graph QL](https://github.com/chentsulin/awesome-graphql)

[Examples](https://github.com/vercel/next.js/tree/canary/examples)
