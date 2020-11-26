const db = require("./database.js");
const PublicApiController = require("./publicApiController.js");

// db.createCollections();
// db.insertDocument();
// db.deleteDocument();

async function init() {
    db.dbConnect();
    db.deleteDocument("codes", {});

    // let jsonData;
    // try {
    //     jsonData = await PublicApiController.getCommonSgCodeList();
    //     console.log(jsonData);
    // } catch(error) {
    //     console.log("xml-parsing-return error");
    //     console.log(error);
    // }

    // db.insertDocument('codes', jsonData);
}

init();

