const config = require("../config/appConfig");
const { Sdk } = require("etherspot");
const CoinGecko = require('coingecko-api');


let createAPISDK = async () => {
    try {
        const sdk = new Sdk(config.privateKey);
        console.log("new sdk has been created ....");
        return sdk;

    } catch (err) {
        console.log("Error during creating sdk ...");
        throw err;
    }

}

const getTokenListTokenFromSdk = async () => {
    try {
        let sdk = await createAPISDK();
        const sdkTokens = await sdk.getTokenListTokens();
        // console.log("sdkTokens ::", sdkTokens[0]);
        return sdkTokens;


    } catch (err) {
        console.log("Error While getting token list");
        throw err;
    }
}


const getCoinPriceForListOfTokens = async () => {
    try {
        const CoinGeckoClient = new CoinGecko();
        let dataArray = [];
        let token = await getTokenListTokenFromSdk();
        // for (let tok =0;tok < token.length; tok++) {
        for (let tok = 0; tok < 30; tok++) {
            let getAPIResponseInUSD = await CoinGeckoClient.simple.fetchTokenPrice({
                contract_addresses: token[tok]['address'],
                vs_currencies: 'usd',
            });
            let getAPIResponseInGBP = await CoinGeckoClient.simple.fetchTokenPrice({
                contract_addresses: token[tok]['address'],
                vs_currencies: 'gbp',
            });
            let dataObj = {
                address: token[tok]['address'],
                chainId: token[tok]['chainId'],
                decimals: token[tok]['decimals'],
                logoURI: token[tok]['logoURI'],
                name: token[tok]['name'],
                symbol: token[tok]['symbol'],
                flat_price_USD: (getAPIResponseInUSD && getAPIResponseInUSD.data && Object.keys(getAPIResponseInUSD.data).length ? getAPIResponseInUSD.data[token[tok]['address'].toLowerCase()].usd : ''),
                flat_price_GBP: (getAPIResponseInGBP && getAPIResponseInGBP.data && Object.keys(getAPIResponseInGBP.data).length ? getAPIResponseInGBP.data[token[tok]['address'].toLowerCase()].gbp : ''),

            }
            dataArray.push(dataObj);

        }
        // console.log("dataArray ::", dataArray);
        // return dataArray;
        return {
            status: 200,
            data: dataArray
        }


    } catch (err) {
        console.log("Problem during getting price of token");
        return {
            status: 500,
            error: 'Something going worng during getting price of token ...'
        }
    }

}

module.exports = {
    getCoinPriceForListOfTokens
}
