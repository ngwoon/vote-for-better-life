const PublicApiServices = require("./publicApiServices");

const serviceKey = "Rjj2Ly96fAEYLPcwTSh2uwRIQdnVxrDHYbRPoNnVPATdfBB17ok1x1luVwLQi5OqlkvnLU3EpLwJliSQ61cYxw%3D%3D";

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
            response = await PublicApiServices.getCommonSgCodeList({
                url: url + queryParams,
                method: "GET",
            });
        } catch(error) {
            console.log("선거코드 API 요청 에러");
            console.log(error);
        }

        return JSON.parse(response.body).getCommonSgCodeList.item;
    },
    getPolplcOtlnmapTrnsportInfoInqire: async (sgId, sdName) => {
        const url = "http://apis.data.go.kr/9760000/PolplcInfoInqireService2/getPrePolplcOtlnmapTrnsportInfoInqire";
        const pageNo = "";
        const resultType = "json";
        // const sdNames = ["서울특별시", "부산광역시", "대구광역시", "인천광역시", "광주광역시", "인천광역시", "대전광역시", "울산광역시", "세종특별자치시", "경기도", "강원도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주특별자치도"];
        const wiwName = "";
        const numOfRows = "";

        let queryParams = "?" + encodeURIComponent("serviceKey") + "=" + serviceKey;
        queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent(pageNo);
        queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent(numOfRows);
        queryParams += "&" + encodeURIComponent("sgId") + "=" + encodeURIComponent(sgId);
        queryParams += "&" + encodeURIComponent("resultType") + "=" + encodeURIComponent(resultType);
        queryParams += "&" + encodeURIComponent("sdName") + "=" + encodeURIComponent(sdName);
        queryParams += "&" + encodeURIComponent("wiwName") + "=" + encodeURIComponent(wiwName);

        let response;
        try {
            response = await PublicApiServices.getPolplcOtlnmapTrnsportInfoInqire({
                url: url + queryParams,
                method: "GET",
            });
        } catch(error) {
            console.log("-- 선거일 투표소 정보 API 오류 -- ");
            console.log(error);
        }

        console.log(response.body);

        return JSON.parse(response.body).getPolplcOtlnmapTrnsportInfoInqire.item;
    },

    getPofelcddRegistSttusInfoInqire: async (sgId, sgTypecode) => {
        const url = "http://apis.data.go.kr/9760000/PofelcddInfoInqireService/getPofelcddRegistSttusInfoInqire";
        const pageNo = "1";
        const resultType = "json";
        const numOfRows = "10";
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

        console.log(queryParams);

        let response;
        try {
            response = await PublicApiServices.getPolplcOtlnmapTrnsportInfoInqire({
                url: url + queryParams,
                method: "GET",
            });
        } catch(error) {
            console.log("-- 후보자 정보 API 오류 -- ");
            console.log(error);
        }

        console.log(response.body);

        let result = [];
        try {
            result = JSON.parse(response.body).getPofelcddRegistSttusInfoInqire.item
        } catch(error) {
            console.log("RESULT ERROR");
        } finally {
            return result;
        }
        // return JSON.parse(response.body).getPofelcddRegistSttusInfoInqire.item;
    },
};