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
    sendPublicApiRequest: (params) => {
        return new Promise((resolve, reject) => {
            request(params, (error, response, body) => {
                if(!error)
                    resolve(response, body);
                else
                    reject(error);
            });
        });
    },
};