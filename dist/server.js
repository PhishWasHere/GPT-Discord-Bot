"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const port = process.env.PORT || 3001;
const mongo_1 = __importDefault(require("./config/mongo"));
const discord_1 = require("./discord");
mongo_1.default.once('open', async () => {
    console.log(`\x1b[35m> Ready!\x1b[0m Connected to MongoDB`);
    try {
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.use(body_parser_1.default.json()); // for parsing application/json
        app.use(body_parser_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
        //   app.use(apiVali) //middleware for validating api key so random people cant post to the api
        //   app.use('/', route); // routes
        app.listen(port, () => {
            console.log(`\x1b[35m> Ready!\x1b[0m on http://localhost:${port}`);
        });
        (0, discord_1.clientStart)();
    }
    catch (err) {
        console.error(err.stack);
        process.exit(1);
    }
});
//# sourceMappingURL=server.js.map