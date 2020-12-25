const PublicApiServices = require("./publicApiServices");
const secrets = requre("./secrets.json");

const serviceKey = secrets.API_KEY;

module.exports = {
    getCommonSgCodeList: async () => {
        const url = "http://apis.data.go.kr/9760000/CommonCodeService/getCommonSgCodeList";
        const pageNo = 1;
        const numOfRows = 30;
        const resultType = "json";

        let queryParams = "?" + encodeURIComponent("pageNo") + "=" + encodeURIComponent(pageNo);
        queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent(numOfRows);
        queryParams += "&" + encodeURIComponent("resultType") + "=" + encodeURIComponent(resultType);
        queryParams += "&" + encodeURIComponent("serviceKey") + "=" + serviceKey;

        let response = null;
        try {
            response = await PublicApiServices.sendPublicApiRequest({
                url: url + queryParams,
                method: "GET",
            });
        } catch(error) {
            console.log("선거코드 API 요청 에러");
            console.log(error);
        }

        return JSON.parse(response.body).getCommonSgCodeList.item;
    },
    getPolplcOtlnmapTrnsportInfoInqire: async (sgId, sdName, sgTypecode) => {
        const url = "http://apis.data.go.kr/9760000/PolplcInfoInqireService2/getPolplcOtlnmapTrnsportInfoInqire";
        const pageNo = "1";
        const numOfRows = "100000000";
        const wiwName = "";
        const resultType = "json";

        let queryParams = "?" + encodeURIComponent("serviceKey") + "=" + serviceKey;
        queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent(pageNo);
        queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent(numOfRows);
        queryParams += "&" + encodeURIComponent("sgId") + "=" + encodeURIComponent(sgId);
        queryParams += "&" + encodeURIComponent("resultType") + "=" + encodeURIComponent(resultType);
        queryParams += "&" + encodeURIComponent("sdName") + "=" + encodeURIComponent(sdName);
        queryParams += "&" + encodeURIComponent("wiwName") + "=" + encodeURIComponent(wiwName);

        let response;
        try {
            response = await PublicApiServices.sendPublicApiRequest({
                url: url + queryParams,
                method: "GET",
            });
        } catch(error) {
            console.log("-- 선거일 투표소 정보 API 오류 -- ");
            console.log(error);
        }

        return JSON.parse(response.body).getPolplcOtlnmapTrnsportInfoInqire.item;
    },

    getPrePolplcOtlnmapTrnsportInfoInqire: async (sgId, sdName) => {
        const url = "http://apis.data.go.kr/9760000/PolplcInfoInqireService2/getPrePolplcOtlnmapTrnsportInfoInqire";
        const pageNo = "1";
        const numOfRows = "100000000";
        const resultType = "json";
        const wiwName = "";

        let queryParams = "?" + encodeURIComponent("serviceKey") + "=" + serviceKey;
        queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent(pageNo);
        queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent(numOfRows);
        queryParams += "&" + encodeURIComponent("sgId") + "=" + encodeURIComponent(sgId);
        queryParams += "&" + encodeURIComponent("resultType") + "=" + encodeURIComponent(resultType);
        queryParams += "&" + encodeURIComponent("sdName") + "=" + encodeURIComponent(sdName);
        queryParams += "&" + encodeURIComponent("wiwName") + "=" + encodeURIComponent(wiwName);

        let response;
        try {
            response = await PublicApiServices.sendPublicApiRequest({
                url: url + queryParams,
                method: "GET",
            });
        } catch(error) {
            console.log("-- 사전 투표소 정보 API 오류 -- ");
            console.log(error);
        }

        return JSON.parse(response.body).getPrePolplcOtlnmapTrnsportInfoInqire.item;
    },

    getPofelcddRegistSttusInfoInqire: async (sgId, sgTypecode) => {
        const url = "http://apis.data.go.kr/9760000/PofelcddInfoInqireService/getPofelcddRegistSttusInfoInqire";
        const pageNo = "1";
        const resultType = "json";
        const numOfRows = "100000000";
        const sdName = "";
        const sggName = "";

        let queryParams = "?" + encodeURIComponent("ServiceKey") + "=" + serviceKey;
        queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent(pageNo);
        queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent(numOfRows);
        queryParams += "&" + encodeURIComponent("sgId") + "=" + encodeURIComponent(sgId);
        queryParams += "&" + encodeURIComponent("sgTypecode") + "=" + encodeURIComponent(sgTypecode);
        queryParams += "&" + encodeURIComponent("resultType") + "=" + encodeURIComponent(resultType);
        queryParams += "&" + encodeURIComponent("sdName") + "=" + encodeURIComponent(sdName);
        queryParams += "&" + encodeURIComponent("sggName") + "=" + encodeURIComponent(sggName);

        let response;
        try {
            response = await PublicApiServices.sendPublicApiRequest({
                url: url + queryParams,
                method: "GET",
            });
        } catch(error) {
            console.log("-- 후보자 정보 API 오류 -- ");
            console.log(error);
        }

        let result;
        try {
            const body = JSON.parse(response.body);
            result = body.getPofelcddRegistSttusInfoInqire.item;
        } catch(error) {
            console.log("서버가 에러를 리턴함.");
            console.log(error);
            result = [];
        } finally {
            return result;
        }
    },

    getCnddtElecPrmsInfoInqire: async (sgId, sgTypecode, cId) => {
        const url = "http://apis.data.go.kr/9760000/ElecPrmsInfoInqireService/getCnddtElecPrmsInfoInqire";
        const pageNo = "1";
        const resultType = "json";
        const numOfRows = "10000000";

        let queryParams = "?" + encodeURIComponent("ServiceKey") + "=" + serviceKey;
        queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent(pageNo);
        queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent(numOfRows);
        queryParams += "&" + encodeURIComponent("sgId") + "=" + encodeURIComponent(sgId);
        queryParams += "&" + encodeURIComponent("sgTypecode") + "=" + encodeURIComponent(sgTypecode);
        queryParams += "&" + encodeURIComponent("cnddtId") + "=" + encodeURIComponent(cId);
        queryParams += "&" + encodeURIComponent("resultType") + "=" + encodeURIComponent(resultType);

        let response;
        try {
            response = await PublicApiServices.sendPublicApiRequest({
                url: url + queryParams,
                method: "GET",
            });
        } catch(error) {
            console.log("-- 선거 공약 정보 API 오류 -- ");
            console.log(error);
        }

        let result;
        try {
            const body = JSON.parse(response.body);
            console.log(body);
            result = body.getCnddtElecPrmsInfoInqire.item;
        } catch(error) {
            console.log("서버가 에러를 리턴함.");
            // console.log(response.body);
            // console.log(error);
            result = [];
        } finally {
            return result;
        }
    },

    addressToLatLng: async (address) => {
        const url = "https://dapi.kakao.com/v2/local/search/address.json";
        const queryParams = encodeURI("?query=" + address.split('(')[0]); 
        
        let response;
        try {
            response = await PublicApiServices.sendPublicApiRequest({
                url: url + queryParams,
                method: "GET",
                headers: {
                    "Authorization": "KakaoAK 06cb0854f127fa6c082db0bf3ebcc884",
                },
                encoding: "utf-8",
            });
        } catch(error) {
            console.log("-- 카카오 주소 좌표 변환 API 오류 -- ");
            console.log(error);
        }

        const body = JSON.parse(response.body);

        if(body.documents === undefined || body.documents.length === 0) {
            return [];
        }

        return body.documents[0];
    },
};