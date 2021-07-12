const {DataSource} = require('apollo-datasource')
const array_of = require('./data');
const _= require('lodash');

class ProfileAPI extends DataSource{

 
    constructor(){
        super()
        this.profiles =  array_of.array_of_profile(2000);
    }

    //TODO:caching ,context logic
    initialize(config){

    }

    //TODO:fix for names
    getProfiles(args){  
        return _.filter(this.profiles,args); 
    }

    //TODo:fix for times
    getProfilesByName(name){ 
        return _.filter(this.profiles,(p)=>p.name.indexOf(name)!=-1);
        
    }
}
//plugin repository here
module.exports = ProfileAPI;