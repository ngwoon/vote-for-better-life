const dbController = require("/opt/nodejs/database");

exports.handler = async (event, context, callback) => {
    console.log(JSON.stringify(event));
    console.log("received data = ", event.searchRangeStat, event.searchTerm);
    
    const searchTerm = decodeURIComponent(event.searchTerm);
    const searchRangeStat = decodeURIComponent(event.searchRangeStat);
    
    console.log(`searchTerm = ${searchTerm}`);
    
    await dbController.dbConnect();
    
    const searchTerms = searchTerm.split(" ");

    let result = [];
    let body = null;
    
    for(let searchTerm of searchTerms) {
        if(searchRangeStat === "3" || searchRangeStat === "2") {
            try {
                const elections = await dbController.findDocument("codes", {SG_NAME: {"$regex": searchTerm, "$options": "i"}});
                result = result.concat(elections);
            } catch(error) {
                console.log("code collection find error");
                console.log(error);
                body = {
                    resultCode: "01",
                    resultMsg: "Election DB Read Fail",
                    item: {
                        
                    },
                }
                break;
            }
        }
        if(searchRangeStat === "3" || searchRangeStat === "1") {
            try {
                const candidators = await dbController.findDocument("candidator", {NAME: {"$regex": searchTerm, "$options": "i"}});
                const sgInfos = [];
                for(let candidator of candidators) {
                    let alreadyExist = false;
                    for(let sgInfo of sgInfos) {
                        if(sgInfo.SG_ID === candidator.SG_ID && sgInfo.SG_TYPECODE === candidator.SG_TYPECODE) {
                            alreadyExist = true;
                            break;
                        }
                    }
                    if(!alreadyExist) {
                        sgInfos.push(candidator);
                    }
                }
                
                for(let sgInfo of sgInfos) {
                    let election = await dbController.findDocument("codes", {SG_ID: sgInfo.SG_ID, SG_TYPECODE: sgInfo.SG_TYPECODE});
                    election = election[0];
                    let alreadyExist = false;
                    for(let sg of result) {
                        if(sg.SG_ID === election.SG_ID && sg.SG_TYPECODE === election.SG_TYPECODE) {
                            alreadyExist = true;
                            break;
                        }
                    }
                    if(!alreadyExist) {
                        result.push(election);
                    }
                }
            } catch(error) {
                console.log("candidator collection find error");
                console.log(error);
                body = {
                    resultCode: "01",
                    resultMsg: "Candidator DB Read Fail",
                    item: {
                        
                    },
                }
                break;
            }
        }
    }
    
    if(body === null) {
        body = {
            resultCode: "00",
            resultMsg: "Success",
            item: {
                result,
            },
        }
    }
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(body),
    };
    
    return response;
};
