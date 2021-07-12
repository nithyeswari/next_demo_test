import '../styles/globals.css'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client'; 
import ErrorBoundary from '../components/errorboundary';

const options = {
  typePolicies: {
    Query: {
      fields: {
        profilesByNameConcat: {
          read: function (existing) {
            return existing;
          },
          merge: function (existing, incoming) {
            return !existing ? {
              _typename: incoming._typename,
              datalist: [...incoming.datalist],
              pageInfo: { ...incoming.pageInfo }

            } : {
              _typename: incoming._typename,
              datalist: [...existing.datalist, ...incoming.datalist],
              pageInfo: { ...existing.pageInfo, ...incoming.pageInfo }

            }
          }
        }
      }
    }
  }
};
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(options),
});

function MyApp({ Component, pageProps }) {
  return (
    
    <ApolloProvider client={client}>  
     <Component {...pageProps} />  
    </ApolloProvider> )
}

export default MyApp
