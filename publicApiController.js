const PublicApiServices = require("./publicApiServices");

const serviceKey = "Rjj2Ly96fAEYLPcwTSh2uwRIQdnVxrDHYbRPoNnVPATdfBB17ok1x1luVwLQi5OqlkvnLU3EpLwJliSQ61cYxw%3D%3D";

module.exports = {
    getCommonSgCodeList: async () => {
        const url = "http://apis.data.go.kr/9760000/CommonCodeService/getCommonSgCodeList";
        const pageNo = 1;
        const numOfRows = 30;
        const resultType = "xml";

        let queryParams = "?" + encodeURIComponent("pageNo") + "=" + encodeURIComponent(pageNo);
        queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent(numOfRows);
        queryParams += "&" + encodeURIComponent("resultType") + "=" + encodeURIComponent(resultType);
        queryParams += "&" + encodeURIComponent("serviceKey") + "=" + serviceKey;

        let data = null;
        try {
            data = await PublicApiServices.getCommonSgCodeList({
                url: url + queryParams,
                method: "GET",
            });
        } catch(error) {
            console.log("선거코드 API 요청 에러");
            console.log(error);
        }

        return new Promise((resolve, reject) => {
            let jsonData = [];
            jsonData = PublicApiServices.processPublicApiData(data);
            console.log("선거코드 xml -> json 완료");
            resolve(jsonData);
        });
    },
    getPolplcOtlnmapTrnsportInfoInqire: async (sgId) => {
        const url = "http://apis.data.go.kr/9760000/PolplcInfoInqireService2/getPolplcOtlnmapTrnsportInfoInqire";
        const pageNo = 1;
        const numOfRows = 10;
        const resultType = "xml";
        const sdName = "서울특별시";
        const wiwName = "종로구";

        let queryParams = "?" + encodeURIComponent("serviceKey") + "=" + serviceKey;
        queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent(pageNo);
        queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent(numOfRows);
        queryParams += "&" + encodeURIComponent("sgId") + "=" + encodeURIComponent(sgId);
        queryParams += "&" + encodeURIComponent("resultType") + "=" + encodeURIComponent(resultType);
        queryParams += "&" + encodeURIComponent("sdName") + "=" + encodeURIComponent(sdName);
        queryParams += "&" + encodeURIComponent("wiwName") + "=" + encodeURIComponent(wiwName);

        let data;
        try {
            data = await PublicApiServices.getPolplcOtlnmapTrnsportInfoInqire({
                url: url + queryParams,
                method: "GET",
            });
        } catch(error) {
            console.log("-- 선거일 투표소 정보 API 오류 -- ");
            console.log(error);
        }

        return new Promise((resolve, reject) => {
            let jsonData = {};
            jsonData = PublicApiServices.processPublicApiData(data);
            console.log("투표소 정보 xml -> json 완료");
            resolve(jsonData);
        });
    },
    initDB: async () => {
        try {
            
            /*
                선거 코드 정보 가져온 뒤 DB에 초기화
            */
            const sgCode = await module.exports.getCommonSgCodeList();
            console.log(sgCode);            

        } catch(error) {
            console.log("-- 선거코드 가져오기 에러 --");
            console.log(error);
        }
    },
};