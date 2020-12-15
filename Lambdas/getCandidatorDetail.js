const dbController = require("/opt/nodejs/database");

exports.handler = async (event) => {
    
    const sgId = event.sgId;
    const sgTypecode = event.sgTypecode;
    
    console.log(sgId, sgTypecode);
    
    await dbController.dbConnect();
    
    const query = {"SG_ID": sgId, "SG_TYPECODE": sgTypecode};
    
    let body = null;
    try {
        const candidators = await dbController.findDocument("candidator", query);
        body = {
            resultCode: "00",
            resultMsg: "Success",
            item: {
                candidators,
            },
        }
    } catch(error) {
        body = {
            resultCode: "01",
            resultMsg: "Candidator DB Read Fail",
            item: {
                
            },
        }
    } finally {
        dbController.dbClose();
    }
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(body),
    };
    
    return response;
};
