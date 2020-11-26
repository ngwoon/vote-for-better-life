const request = require("request");
const parser = require("fast-xml-parser");
const he = require("he");
const options = {
    attributeNamePrefix : "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName : "#text",
    ignoreAttributes : true,
    ignoreNameSpace : false,
    allowBooleanAttributes : false,
    parseNodeValue : true,
    parseAttributeValue : false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: false, //"strict"
    attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
    tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
    stopNodes: ["parse-me-as-string"]
};

module.exports = {
    getCommonSgCodeList: (params) => {
        return new Promise((resolve, reject) => {
            request(params, (error, response, body) => {
                if(!error) 
                    resolve(response, body);
                else
                    reject(error);
            });
        });
    },
    getPolplcOtlnmapTrnsportInfoInqire: (params) => {
        return new Promise((resolve, reject) => {
            request(params, (error, response, body) => {
                if(!error)
                    resolve(response, body);
                else
                    reject(error);
            });
        });
    },
    processPublicApiData: async (data) => {
        let result = [];    
        try {
            const jsonData = parser.parse(data.body, options, true);
            const items = jsonData.response.body.items.item;

            // 선거 타입 코드가 없는 데이터의 경우 정제 작업을 하지 않는다.
            if(items[0].sgTypecode === undefined) {
                result = items;
            } else {
                console.log("==================im in==================");
                // 선거 타입 코드가 있다면 선거 타입 코드가 0인 데이터를 걸러낸다.
                for(item of items) {
                    if(item.sgTypecode !== 0)
                        result.push(item);
                }
            }
        } catch(error) {
            console.log("-- XML Parsing Error --");
            console.log(error);
        } finally {
            return result;
        }
    },
};