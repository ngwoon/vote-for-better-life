const dbController = require("/opt/nodejs/database");

exports.handler = async (event) => {
    
    const sgId = event.sgId;
    const sgTypecode = event.sgTypecode;
    
    const query = {"SG_ID": sgId, "SG_TYPECODE": sgTypecode};
    
    let body = null;
    
    await dbController.dbConnect();
    
    try {
        const sgInfo = await dbController.findDocument("codes", query);
    
        body = {
            resultCode: "00",
            resultMsg: "Success",
            item: {
                sgInfo,
            }
        };
    } catch(error) {
        body = {
            resultCode: "01",
            resultMsg: "Election DB Read Fail",
            item: {},
        };
    } finally {
        dbController.dbClose();
    }
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(body),
    };
    
    return response;
};
