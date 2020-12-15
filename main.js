const request = require("request");
const db = require("./database.js");
const publicApiController = require("./publicApiController.js");

// 투표소 정보 요청 시 쿼리로 주어야 하는 지역정보
const sdNames = ["서울특별시", "부산광역시", "대구광역시", "인천광역시", "광주광역시", "인천광역시", "대전광역시", "울산광역시", "세종특별자치시", "경기도", "강원도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주특별자치도"];

async function init() {

    await db.dbConnect();
    const data = await db.findDocument("candidator", {NAME: {"$regex": "정", "$options": "i"}});
    console.log(data);
    await db.dbClose();


    /*
        ec2 몽고DB collections 생성
        collection으로는 codes, votePlace, preVotePlace, candidator 가 있다.
        temp와 pledge collection은  공공데이터포털 API의 정보를 가공하기 위해 잠시 저장해 두는 용도로 쓰였다. 
    */
    // await db.dbConnect();
    // db.createCollections();
    // await db.dbClose();





    /*
        모든 API 검색 쿼리의 기본인 선거 코드 API의 모든 정보를 ec2 몽고DB에 저장하는 코드. 
    */
    // await db.dbConnect();
    // console.log("============ Codes =============");
    // const codes = await publicApiController.getCommonSgCodeList();
    // for(code of codes) {
    //     console.log(code);
    //     db.insertDocument("codes", code);
    // }
    // await db.dbClose();

    


    /*
        선거일, 사전 투표소 API에서 모든 정보를 받아 ec2 몽고DB에 삽입하는 코드.
    */
    // await db.dbConnect();
    // const codeData = await db.findDocument("codes", {});
    // const sgIds = new Set();
    // for(code of codeData) {
    //     sgIds.add(code.SG_ID);
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
    // await db.dbClose();





    /*
        후보자 API에서 모든 정보를 받아와, ec2 몽고DB에 삽입하는 코드.
        후보자 정보 중 커리어에 대한 정제 작업이 추가로 진행되었다. 
    */  
    // await db.dbConnect();
    // const codeData = await db.findDocument("codes", {});
    // codes = {};
    // for(code of codeData) {
    //     if(!codes[code.SG_ID])
    //         codes[code.SG_ID] = [];
        
    //     codes[code.SG_ID].push(code.SG_TYPECODE);
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
    // await db.dbClose();




    /*
        선거 공약 API 에서 제공받은 데이터와 후보자 API 에서 제공받은 데이터를 합하는 코드.
        선거 공약 정보는 선거 타입코드 4번만 제공된다는 정보를 알아내어, 선거 공약 데이터가 존재하는 후보만
        선거 공약 필드를 만들고 데이터를 삽입했다.
    */
    // await db.dbConnect();
    // const candidatorData = await db.findDocument("temp", {});
    // const candidators = {};
    // for(candidator of candidatorData) {
    //     candidators[candidator.HUBOID] = candidator;
    // }

    // console.log("============ Pledge Refine =============");
    // for(cId of Object.keys(candidators)) {
    //     if(candidators[cId].SG_TYPECODE !== "4")
    //         continue;
        
    //     const pledgeData = await PublicApiController.getCnddtElecPrmsInfoInqire(candidators[cId].SG_ID, candidators[cId].SG_TYPECODE, cId);
    //     console.log(candidators[cId].SG_ID, " ", candidators[cId].SG_TYPECODE, " ", cId, " turn");
    //     console.log("length = ", pledgeData.length);
    //     console.log();
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
    // await db.dbClose();





    /* 
        공공데이터포털의 선거공약 데이터는 선거 타입코드가 4번인 선거에 한에 제공된다는 소식을 접했다.
        이에 선거 타입코드가 4번이 아닌 데이터들도 선거 공약 필드를 넣어 데이터의 공통성을 유지하기 위해
        필요한 코드.
    */
    // const candidatorData = await db.findDocument("temp", {});
    // const candidators = {};
    // for(candidator of candidatorData) {
    //     candidators[candidator.HUBOID] = candidator;
    // }

    // console.log("============ Temp Refine =============");
    // for(cId of Object.keys(candidators)) {
    //     if(candidators[cId].SG_TYPECODE === "4")
    //         continue;

    //     candidators[cId].PRMS = [];
    // }
    // console.log("============ Candidator Insertion =============");
    // db.insertDocument("candidator", Object.values(candidators));

    // await db.dbClose();








    /*
        선거일 투표소, 사전 투표소 API 데이터의 주소를 이용하여 좌표 정보를 출력, 삽입하는 코드
    */      +
    await db.dbConnect();
    const data = await db.findDocument("votePlace", {LAT: null});
    console.log("데이터 불러오기 완료");

    console.log(data);

    for(place of data) {
        const result = await publicApiController.addressToLatLng(place.ADDR);

        const query = {SG_ID: place.SG_ID, ADDR: place.ADDR};

        let updateQuery;
        if(result.length !== 0)
            updateQuery = {$set: {"LAT": result.address.y, "LNG": result.address.x}};
        else
            updateQuery = {$set: {"LAT": "0", "LNG": "0"}};

        await db.updateDocument("votePlace", query, updateQuery);
        console.log(`SG_ID = ${place.SG_ID}, ADDR = ${place.ADDR} 수정 완료`);
    }

    await db.dbClose();
}

init();

