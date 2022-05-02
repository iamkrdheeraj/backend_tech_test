
const appController = require("../controller/appController");
let setAppRouter = async (app) => {
    let baseUrl = '/etherspot';
    await app.get(baseUrl + '/getAllDetails', async(req, res) => {
        let response =  await appController.getCoinPriceForListOfTokens();
        res.send(response);
    }
    );
}

module.exports = {
    setAppRouter
}