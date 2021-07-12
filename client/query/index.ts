
import { gql } from '@apollo/client';

export const search_query_pagination = gql`
query  GetProfilesByName($name: String,$offset:Int,$limit:Int){
    profilesByName(name :$name,offset:$offset,limit:$limit){
        datalist{
            name,
            address{
                addressLine1,
                addressLine2,
                country,
                zipcode
              }
        }  pageInfo{
            totalItemCount 
          }
    }
  }
`;


export const search_query_infinite = gql`
query  GetProfilesByNameConcat($name: String,$afterCursor:String,$limit:Int){
    profilesByNameConcat(name :$name,afterCursor:$afterCursor,limit:$limit){
        datalist{
            name,
            address{
                addressLine1,
                addressLine2,
                country,
                zipcode
              },
              cursor
        }  pageInfo{
            totalItemCount
            lastCursor
            hasNextPage
          }
    }
  }
`;