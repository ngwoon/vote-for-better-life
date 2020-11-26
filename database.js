const mongoose = require("mongoose");

const collNameToScheme = {
    codes: new mongoose.Schema({
        sgId: "string",
        sgName: "string",
        sgTypecode: "string",
        sgVotedate: "string",
    }, {id: false}),
    preVotePlace: new mongoose.Schema({
        sgId: "string",
        sgName: "string",
        evPsName: "string",
        sdName: "string",
        wiwName: "string",
        emdName: "string",
        placeName: "string",
        addr: "string",
        floor: "string",
    }, {id: false}),
    votePlace: new mongoose.Schema({
        sgId: "string",
        sgName: "string",
        evPsName: "string",
        sdName: "string",
        wiwName: "string",
        emdName: "string",
        placeName: "string",
        addr: "string",
        floor: "string",
    }, {id: false}),
    candidator: new mongoose.Schema({
        sgId: "string",
        sgName: "string",
        sgTypecode: "string",
        huboid: "string",
        sggName: "string",
        sdName: "string",
        wiwName: "string",
        giho: "string",
        gihoSangse: "string",
        jdName: "string",
        name: "string",
        gender: "string",
        age: "string",
        addr: "string",
        job: "string",
        edu: "string",
        career: "string",
        status: "string",
    }, {id: false}),
    pledge: new mongoose.Schema({
        sgId: "string",
        sgTypecode: "string",
        huboid: "string",
        sggName: "string",
        sdName: "string",
        wiwName: "string",
        jdName: "string",
        name: "string",
        prms: {
            order: "string",
            realm: "string",
            title: "string",
            content: "string",
        },
    }, {id: false}),
}

// const codeSchema = new mongoose.Schema({
//     sgId: "string",
//     sgName: "string",
//     sgTypecode: "string",
//     sgVotedate: "string",
// });

// const preVotePlaceSchema = new mongoose.Schema({
//     sgId: "string",
//     sgName: "string",
//     evPsName: "string",
//     sdName: "string",
//     wiwName: "string",
//     emdName: "string",
//     placeName: "string",
//     addr: "string",
//     floor: "string",
// });

// const votePlaceSchema = new mongoose.Schema({
//     sgId: "string",
//     sgName: "string",
//     evPsName: "string",
//     sdName: "string",
//     wiwName: "string",
//     emdName: "string",
//     placeName: "string",
//     addr: "string",
//     floor: "string",
// });

// const candidatorSchema = new mongoose.Schema({
//     sgId: "string",
//     sgName: "string",
//     sgTypecode: "string",
//     huboid: "string",
//     sggName: "string",
//     sdName: "string",
//     wiwName: "string",
//     giho: "string",
//     gihoSangse: "string",
//     jdName: "string",
//     name: "string",
//     gender: "string",
//     age: "string",
//     addr: "string",
//     job: "string",
//     edu: "string",
//     career: "string",
//     status: "string",
// });

// const pledgeSchema = new mongoose.Schema({
//     sgId: "string",
//     sgTypecode: "string",
//     huboid: "string",
//     sggName: "string",
//     sdName: "string",
//     wiwName: "string",
//     jdName: "string",
//     name: "string",
//     prms: {
//         order: "string",
//         realm: "string",
//         title: "string",
//         content: "string",
//     },
// });

module.exports = {
    dbConnect: async () => {
        mongoose.Promise = global.Promise;
        try {
            // CONNECT TO MONGODB SERVER
            await mongoose.connect("mongodb://client:client_password@ec2-100-26-95-212.compute-1.amazonaws.com:27017/vote-for-better-life", { useUnifiedTopology: true, useNewUrlParser: true })
            console.log('Successfully connected to mongodb');
        } catch(error) {
            console.log("-- db connection error --");
            console.log(error);
        }
    },

    checkCollectionExists: (collectionName) => {

    },

    createCollections: async () => {
        // 선거코드 정보 컬렉션 생성
        const codes = mongoose.model("Codes", collNameToScheme['codes']);
        codes.createCollection().then((collection) => {
            console.log("-- Codes Collection Successfully Created -- ");
        });

        // 사전 투표소 정보 컬렉션 생성
        const preVotePlace = mongoose.model("preVotePlace", collNameToScheme['preVotePlace']);
        preVotePlace.createCollection().then((collection) => {
            console.log("-- PreVotePlace Collection Successfully Created -- ");
        });
        

        // 선거일 투표소 정보 컬렉션 생성
        const votePlace = mongoose.model("votePlace", collNameToScheme['votePlace']);
        votePlace.createCollection().then((collection) => {
            console.log("-- VotePlace Collection Successfully Created -- ");
        });

        // 후보자 정보 컬렉션 생성
        const candidator = mongoose.model("candidator", collNameToScheme['candidator']);
        candidator.createCollection().then((collection) => {
            console.log("-- Candidator Collection Successfully Created -- ");
        });


        // 선거 공약 정보 컬렉션 생성
        const pledge = mongoose.model("pledge", collNameToScheme['pledge']);
        pledge.createCollection().then((collection) => {
            console.log("-- Pledge Collection Successfully Created -- ");
        });
    },

    insertDocument: async (collectionName, data) => {
        const collection = mongoose.model(collectionName, collNameToScheme[collectionName]);

        try {
            const result = await collection.insertMany(data);
            console.log("-- db insert result --");
            console.log(result);
        } catch(error) {
            console.log("-- db insert error --");
            console.log(error);
        }
    },

    findDocument: async (collectionName, query) => {
        const collection = mongoose.model(collectionName, collNameToScheme[collectionName]);
        try {
            const result = await collection.find(query);
            console.log("-- DB find result --");
            console.log(result);
        } catch(error) {
            console.log("-- DB find error --");
            console.log(error);
        }
    },
    deleteDocument: async (collectionName, query) => {
        const collection = mongoose.model(collectionName, collNameToScheme[collectionName]);

        try {
            const result = await collection.deleteMany(query);
            console.log("-- DB delete result --");
            console.log(result);
        } catch(error) {
            console.log("-- DB delete error --");
            console.log(error);
        }
    },
}