const mongoose = require("mongoose");

const collNameToScheme = {
    codes: new mongoose.Schema({
        SG_ID: "string",
        SG_NAME: "string",
        SG_TYPECODE: "string",
        SG_VOTEDATE: "string",
    }, {_id: false}),

    preVotePlace: new mongoose.Schema({
        SG_ID: "string",
        EV_PS_Name: "string",
        SD_NAME: "string",
        WIW_NAME: "string",
        EMD_NAME: "string",
        PLACE_NAME: "string",
        ADDR: "string",
        FLOOR: "string",
        LAT: "string",
        LNG: "string",
    }, {_id: false}),
    votePlace: new mongoose.Schema({
        SG_ID: "string",
        PS_NAME: "string",
        SD_NAME: "string",
        WIW_NAME: "string",
        EMD_NAME: "string",
        PLACE_NAME: "string",
        ADDR: "string",
        FLOOR: "string",
        LAT: "string",
        LNG: "string",
    }, {_id: false}),
    temp: new mongoose.Schema({
        HUBOID: "string",
        NAME: "string",
        GENDER: "string",
        AGE: "string",
        ADDR: "string",
        JOB: "string",
        EDU: "string",

        SG_ID: "string",
        SG_TYPECODE: "string",
        SGG_NAME: "string",
        SD_NAME: "string",
        WIW_NAME: "string",
        GIHO: "string",
        GIHO_SANGSE: "string",
        JD_NAME: "string",
        CAREER: ["string"],
        STATUS: "string",
    }),
    candidator: new mongoose.Schema({
        HUBOID: "string",
        NAME: "string",
        GENDER: "string",
        AGE: "string",
        ADDR: "string",
        JOB: "string",
        EDU: "string",

        SG_ID: "string",
        SG_TYPECODE: "string",
        SGG_NAME: "string",
        SD_NAME: "string",
        WIW_NAME: "string",
        GIHO: "string",
        GIHO_SANGSE: "string",
        JD_NAME: "string",
        CAREER: ["string"],
        STATUS: "string",
        PRMS: [{
            ORDER: "string",
            REALM: "string",
            TITLE: "string",
            CONTENT: "string",
        }]
    }, {_id: false}),
    pledge: new mongoose.Schema({
        HUBOID: "string",
        NAME: "string",
        SG: [{
            SG_ID: "string",
            SG_TYPECODE: "string",
            SGG_NAME: "string",
            SD_NAME: "string",
            WIW_NAME: "string",
            JD_NAME: "string",
            PRMS: [{
                ORDER: "string",
                REALM: "string",
                TITLE: "string",
                CONTENT: "string",
            }]
        }]
    }, {_id: false}),
}

const collections = {
    codes: mongoose.model('codes', collNameToScheme['codes']),
    votePlace: mongoose.model('votePlace', collNameToScheme['votePlace']),
    preVotePlace: mongoose.model('preVotePlace', collNameToScheme['preVotePlace']),
    candidator: mongoose.model('candidator', collNameToScheme['candidator']),
    plede: mongoose.model('pledge', collNameToScheme['pledge']),
    temp: mongoose.model('temp', collNameToScheme['temp']),
}

module.exports = {
    dbConnect: async () => {
        mongoose.Promise = global.Promise;
        try {
            // CONNECT TO MONGODB SERVER
            await mongoose.connect("mongodb://client:client_password@ec2-100-26-95-212.compute-1.amazonaws.com:27017/vote-for-better-life", { useUnifiedTopology: true, useNewUrlParser: true })
            console.log('Successfully connect to mongodb');
        } catch(error) {
            console.log("-- db connection error --");
            console.log(error);
        }
    },

    dbClose: async () => {
        try {
            await mongoose.disconnect();
            console.log('Successfully close connection');
        } catch(error) {
            console.log("-- DB close error --");
            console.log(error);
        }
    },

    createCollections: (collectionName) => {
        // 선거코드 정보 컬렉션 생성
        const collection = mongoose.model(collectionName, collNameToScheme[collectionName]);
        collection.createCollection().then((collection) => {
            console.log("-- ", collectionName, " Collection Successfully Created -- ");
        });
    },

    dropCollections: (collectionName) => {
        //선거코드 정보 컬렉션 제거
        const collection = mongoose.model(collectionName, collNameToScheme['codes']);
        collection.collection.drop().then((collection) => {
            console.log("-- ", collectionName, " Collection Successfully Dropped -- ");
        });
    },

    insertDocument: async (collectionName, data) => {
        const collection = collections[collectionName];
        let result;
        try {
            result = await collection.insertMany(data);
            console.log("-- db insert result --");
            // console.log(result);
        } catch(error) {
            console.log("-- db insert error --");
            console.log(error);
            result = [];
        }
        return result;
    },

    findDocument: async (collectionName, query) => {
        const collection = collections[collectionName];
        let result;
        try {
            result = await collection.find(query);
            console.log("-- DB find result --");
            // console.log(result);
        } catch(error) {
            console.log("-- DB find error --");
            console.log(error);
            result = [];
        }

        return result;
    },

    updateDocument: async (collectionName, findQuery, updateQuery) => {
        const collection = collections[collectionName];
        let result;
        try {
            result = await collection.updateOne(findQuery, updateQuery);
            console.log("-- DB update result --");
            console.log(result);
        } catch(error) {
            console.log("-- DB update error --");
            console.log(error);
            result = [];
        }

        return result;
    },

    deleteDocument: async (collectionName, query) => {
        const collection = collections[collectionName];
        let result;
        try {
            result = await collection.deleteMany(query);
            console.log("-- DB delete result --");
            console.log(result);
        } catch(error) {
            console.log("-- DB delete error --");
            console.log(error);
            result = [];
        }
        return result;
    },
}