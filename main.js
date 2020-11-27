const db = require("./database.js");
const PublicApiController = require("./publicApiController.js");

async function init() {
    db.dbConnect();
    // db.createCollections();

    // const codeData = await PublicApiController.getCommonSgCodeList();
    // console.log(codeData);
    const result = await db.findDocument("codes", {SG_VOTEDATE: "20200415"});
    console.log(result);
    // db.deleteDocument("codes", {});
    // sgIds = [];
    // for(code of codeData)
    //     sgIds.push(code.SG_ID);

    // const result = await PublicApiController.getPolplcOtlnmapTrnsportInfoInqire("20200415", "서울특별시");
    // console.log(result);
    // console.log(codeData);
    // db.insertDocument('codes', codeData);
    // db.dropCollections();
    // db.deleteDocument('codes', {});
    // db.deleteDocument('votePlace', {});
    // db.deleteDocument('preVotePlace', {});
    // db.deleteDocument('candidator', {});
    // db.deleteDocument('pledge', {});

    

    // console.log(result);
}

init();

