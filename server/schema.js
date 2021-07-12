const { gql } = require('apollo-server');

module.exports = gql`
type PageInfo{
    totalItemCount :Int,
    lastCursor:String,
    hasNextPage:Boolean
}
type ProfilesResults{
    datalist:[Profile]
    pageInfo: PageInfo
}
type Query @rateLimit(limit:20,duration:10){
    profiles(id:ID,
        name:String,
        addressLine1:String,  
        address:String,
        email:String,
        Phone:String):[Profile] ,
    profilesByName(name:String,offset:Int=0,limit:Int=-1):ProfilesResults
    profilesByNameConcat(name:String,limit:Int=-1,afterCursor:String=""):ProfilesResults
}
type Profile{
    id:ID!,
    name:String!,
    address:Address,
    email:String,
    Phone:String!,
    cursor:String
}
 
type Address{
    addressLine1:String,  
    addressLine2:String ,  
    addressLine3:String @deprecated(reason:"replaced by address field"),  
    country:String,
    zipcode:String

}
type Error {
    code:String
    message:String
    token:String
}
`;

//TODO nesting data
//Rest datasource
//Union to show error or profile