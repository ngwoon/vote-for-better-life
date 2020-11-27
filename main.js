const db = require("./database.js");
const PublicApiController = require("./publicApiController.js");

const sdNames = ["서울특별시", "부산광역시", "대구광역시", "인천광역시", "광주광역시", "인천광역시", "대전광역시", "울산광역시", "세종특별자치시", "경기도", "강원도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주특별자치도"];

async function init() {
    // await db.dbConnect();
    // db.createCollections();
    // const codeData = await db.findDocument("codes", {});
    // codes = {};
    // for(code of codeData) {
    //     if(!codes[code.SG_ID])
    //         codes[code.SG_ID] = [];
        
    //     codes[code.SG_ID].push(code.SG_TYPECODE);
    // }

    // console.log("============ VotePlace =============");
    // for(sdName of sdNames) {
    //     for(sgId of sgIds) {
    //         const votePlaceData = await PublicApiController.getPolplcOtlnmapTrnsportInfoInqire(sgId, sdName);
    //         console.log(sdName, ", ", sgId, " turn");
    //         console.log("length = ", votePlaceData.length);
    //         if(votePlaceData.length !== 0) {
    //             db.insertDocument("votePlace", votePlaceData);
    //         }
    //     }
    // }

    // console.log("============ PreVotePlace =============");
    // for(sdName of sdNames) {
    //     for(sgId of sgIds) {
    //         const preVotePlaceData = await PublicApiController.getPrePolplcOtlnmapTrnsportInfoInqire(sgId, sdName);
    //         console.log(sdName, ", ", sgId, " turn");
    //         console.log("length = ", preVotePlaceData.length);
    //         if(preVotePlaceData.length !== 0) {
    //             db.insertDocument("preVotePlace", preVotePlaceData);
    //         }
    //     }
    // }


    // console.log("============ Candidator =============");
    // for(sgId of Object.keys(codes)) {
    //     for(let i=0; i<codes[sgId].length; ++i) {
    //         const candidatorData = await PublicApiController.getPofelcddRegistSttusInfoInqire(sgId, codes[sgId][i]);
    //         console.log(sgId, ", ", codes[sgId][i], " turn");
    //         console.log("length = ", candidatorData.length);
    //         if(candidatorData.length !== 0) {
    //             for(data of candidatorData) {
    //                 data.CAREER = [];
    //                 data.CAREER.push(data.CAREER1);
    //                 delete data.CAREER1;
    //                 if(data.CAREER2) {
    //                     data.CAREER.push(data.CAREER2);
    //                     delete data.CAREER2;
    //                 }
    //             }
    //             db.insertDocument('temp', candidatorData);
    //         }
    //     }
    // }

    // const candidatorData = await db.findDocument("temp", {});
    // const candidators = {};
    // for(candidator of candidatorData)
    //     candidators[candidator.HUBOID] = candidator;

    // console.log("============ Pledge =============");
    // for(cId of Object.keys(candidators)) {
    //     const pledgeData = await PublicApiController.getCnddtElecPrmsInfoInqire(candidators[cId].SG_ID, candidators[cId].SG_TYPECODE, cId);
    //     console.log(candidators[cId].SG_ID, " ", candidators[cId].SG_TYPECODE, " ", cId, " turn");
    //     console.log("length = ", pledgeData.length);
    //     candidators[cId].PRMS = [];
    //     if(pledgeData.length !== 0) {
    //         idx = 1;
    //         while(pledgeData["prmsOrd"+idx]) {
    //             const prm = {};
    //             prm["ORDER"] = pledgeData["prmsOrd"+idx];
    //             prm["REALM"] = pledgeData["prmsRealmName"+idx];
    //             prm["TITLE"] = pledgeData["prmsTitle"+idx];
    //             prm["CONTENT"] = pledgeData["prmsCont"+idx];
    //             candidators[cId].PRMS.push(prm);
    //             ++idx;
    //         }
    //     }
    // }

    // console.log("============ Candidator Insertion =============");
    // db.insertDocument("candidator", Object.values(candidators));



    const data = await PublicApiController.getCnddtElecPrmsInfoInqire("20200415", "4", "100000000");
    console.log(data);
}

init();

