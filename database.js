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
        SG_NAME: "string",
        EV_PS_Name: "string",
        SD_NAME: "string",
        WIW_NAME: "string",
        EMD_NAME: "string",
        PLACE_NAME: "string",
        ADDR: "string",
        FLOOR: "string",
    }, {_id: false}),
    votePlace: new mongoose.Schema({
        SG_ID: "string",
        SG_NAME: "string",
        PS_NAME: "string",
        SD_NAME: "string",
        WIW_NAME: "string",
        EMD_NAME: "string",
        PLACE_NAME: "string",
        ADDR: "string",
        FLOOR: "string",
    }, {_id: false}),
    candidator: new mongoose.Schema({
        SG_ID: "string",
        SG_NAME: "string",
        SG_TYPECODE: "string",
        HUBOID: "string",
        SGG_NAME: "string",
        SD_NAME: "string",
        WIW_NAME: "string",
        GIHO: "string",
        GIHO_SANGSE: "string",
        JD_NAME: "string",
        NAME: "string",
        GENDER: "string",
        AGE: "string",
        ADDR: "string",
        JOB: "string",
        EDU: "string",
        CAREER: "string",
        STATUS: "string",
    }, {_id: false}),
    pledge: new mongoose.Schema({
        SG_ID: "string",
        SG_TYPECODE: "string",
        HUBOID: "string",
        SGG_NAME: "string",
        SD_NAME: "string",
        WIW_NAME: "string",
        JD_NAME: "string",
        NAME: "string",
        PRMS: {
            ORDER: "string",
            REALM: "string",
            TITLE: "string",
            CONTENT: "string",
        },
    }, {_id: false}),
}

const collections = {
    codes: mongoose.model('codes', collNameToScheme['codes']),
    votePlace: mongoose.model('votePlace', collNameToScheme['votePlace']),
    preVotePlace: mongoose.model('preVotePlace', collNameToScheme['preVotePlace']),
    candidator: mongoose.model('candidator', collNameToScheme['candidator']),
    plede: mongoose.model('pledge', collNameToScheme['pledge']),
}

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

    createCollections: () => {
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

    dropCollections: () => {
        // 선거코드 정보 컬렉션 제거
        const codes = mongoose.model("Codes", collNameToScheme['codes']);
        codes.collection.drop().then((collection) => {
            console.log("-- Codes Collection Successfully Dropped -- ");
        });

        // 사전 투표소 정보 컬렉션 생성
        const preVotePlace = mongoose.model("preVotePlace", collNameToScheme['preVotePlace']);
        preVotePlace.collection.drop().then((collection) => {
            console.log("-- PreVotePlace Collection Successfully Dropped -- ");
        });
        
        // 선거일 투표소 정보 컬렉션 제거
        const votePlace = mongoose.model("votePlace", collNameToScheme['votePlace']);
        votePlace.collection.drop().then((collection) => {
            console.log("-- VotePlace Collection Successfully Dropped -- ");
        });

        // 후보자 정보 컬렉션 제거
        const candidator = mongoose.model("candidator", collNameToScheme['candidator']);
        candidator.collection.drop().then((collection) => {
            console.log("-- Candidator Collection Successfully Dropped -- ");
        });

        // 선거 공약 정보 컬렉션 제거
        const pledge = mongoose.model("pledge", collNameToScheme['pledge']);
        pledge.collection.drop().then((collection) => {
            console.log("-- Pledge Collection Successfully Dropped -- ");
        });
    },

    insertDocument: async (collectionName, data) => {
        const collection = collections[collectionName];

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
        const collection = collections[collectionName];

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
        const collection = collections[collectionName];
        
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