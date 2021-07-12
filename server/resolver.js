const { ApolloError } = require("apollo-server");
const { day_of_year } = require("casual");
const getCursor = (id) => { 
    if (id) {
        return Buffer.from(id.toString()).toString("base64");
    } return null;
};
const getOffsetCustom = (response, afterCursor) => {
    const offset = response.findIndex((rec) => {
        return getCursor(rec.id) === afterCursor
    });
    console.log(offset)
    return offset === -1 ? 0 : offset + 1
};

module.exports = {
    Query: {
        profiles: (parent, args, { dataSources }, info) => {
            try {
                return dataSources.profileAPI.getProfiles(args, 2000);
            } catch (err) {
                return new ApolloError("Unable to retrieve profiles", "ERROR", { token: Math.random });
            }

        },
        profilesByName: (parent, args, { dataSources }, info) => {
            try {
                const { offset, limit, name } = args; 
                const response = dataSources.profileAPI.getProfilesByName(name);
                let res = {
                    datalist: response.slice(offset, limit + offset),
                    pageInfo: {
                        totalItemCount: response.length
                    }
                }
                console.log(response.slice(offset, limit + offset));
                return res;

            } catch (err) {
                return new ApolloError("Unable to search profiles", "ERROR", { token: Math.random });
            }

        },

        profilesByNameConcat: (parent, args, { dataSources }, info) => {

            try {
                const { afterCursor, limit, name } = args;
                const response = dataSources.profileAPI.getProfilesByName(name);
                const offset = getOffsetCustom(response, afterCursor);
                const data = response.slice(offset, limit + offset).map((rec) => {
                    rec.cursor = getCursor(rec.id);
                    return rec;
                });
                console.log(data);
                const pageInfo = {
                    totalItemCount: response.length,
                    lastCursor: data.length > 0 && response[data.length + 1] ? getCursor(response[data.length + 1].id) : "",
                    hasNextPage: offset + data.length < response.length
                };
                console.log(pageInfo);
                let res = {
                    datalist: data,
                    pageInfo: pageInfo
                }
                return res;

            } catch (err) {
                console.log(err);
                return new ApolloError("Unable to search profiles", "ERROR", { token: Math.random });
            }

        }

    }
}