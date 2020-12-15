const dbController = require("/opt/nodejs/database");

exports.handler = async (event) => {
    
    const sgId = event.sgId;
    const sdName = decodeURIComponent(event.sdName);
    
    const query = {"SG_ID": sgId, "SD_NAME": sdName};

    let body = null;
    
    await dbController.dbConnect();
    
    try {
        const votePlaces = await dbController.findDocument("votePlace", query);
        const preVotePlaces = await dbController.findDocument("preVotePlace", query);
    
        body = {
            resultCode: "00",
            resultMsg: "Success",
            item: {
                votePlaces,
                preVotePlaces,
            }
        };
    } catch(error) {
        body = {
            resultCode: "01",
            resultMsg: "VotePlace DB Read Fail",
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