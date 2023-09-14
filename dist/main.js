"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const logger = new common_1.Logger('bootstrhbnap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(3000);
    const port = 3000;
    logger.log(`Application listening on port: ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map