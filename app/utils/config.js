
const path = require('path');
global.IS_PROD = process.env.IS_PROD || 0
if (IS_PROD == 0) {
 const projectRootPath = path.join(process.cwd(), '../.env')
 require("dotenv").config({ path: `${projectRootPath}` })
}
require("dotenv").config();

global.PORT = process.env.PORT
global.WHITELIST_DOMAIN = process.env.WHITELIST_DOMAIN

global.MONGO_DB_USER = process.env.MONGO_DB_USER
global.MONGO_DB_USER_PWD = process.env.MONGO_DB_USER_PWD
global.MONGO_DB_HOST = process.env.MONGO_DB_HOST
global.MONGO_DB_NAME = process.env.MONGO_DB_NAME