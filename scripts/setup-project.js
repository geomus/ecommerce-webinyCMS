const fs = require("fs");
const path = require("path");
const { green } = require("chalk");
const crypto = require("crypto");
const loadJson = require("load-json-file");
const writeJson = require("write-json-file");
const uuid = require("uuid/v4");

const PROJECT_FOLDER = ".";

const PROJECT_NAME = "wonderslug";

(async () => {
    console.log(`✍️  Writing environment config files...`);
    // Create root .env.json
    const rootEnvJsonPath = path.resolve(PROJECT_FOLDER, ".env.json");
    const rootExampleEnvJsonPath = path.resolve(PROJECT_FOLDER, "example.env.json");
    if (fs.existsSync(rootEnvJsonPath)) {
        console.log(`⚠️  ${green(".env.json")} already exists, skipping.`);
    } else {
        fs.copyFileSync(rootExampleEnvJsonPath, rootEnvJsonPath);

        const envJson = await loadJson.sync(rootEnvJsonPath);
        const MONGO_UUID = uuid().split("-").shift();

        ["local", "dev", "prod"].forEach((env) => {
            envJson[env].MONGODB_NAME = `${MONGO_UUID}-${PROJECT_NAME}-${env}`;
        });
        await writeJson(rootEnvJsonPath, envJson);
        console.log(`✅️ ${green(".env.json")} was created successfully!`);
    }

    // Create API .env.json
    const envJsonPath = path.resolve(PROJECT_FOLDER, "api", ".env.json");
    const exampleEnvJsonPath = path.resolve(PROJECT_FOLDER, "api", "example.env.json");
    if (fs.existsSync(envJsonPath)) {
        console.log(`⚠️  ${green("api/.env.json")} already exists, skipping.`);
    } else {
        fs.copyFileSync(exampleEnvJsonPath, envJsonPath);

        const envJson = await loadJson.sync(envJsonPath);
        const S3_UUID = uuid().split("-").shift();

        ["local", "dev", "prod"].forEach((env) => {
            const jwtSecret = crypto.randomBytes(128).toString("base64").slice(0, 60);
            envJson[env].JWT_SECRET = jwtSecret;
            envJson[env].S3_BUCKET = `${S3_UUID}-${PROJECT_NAME}-${env}`;
        });

        await writeJson(envJsonPath, envJson);
        console.log(`✅️ ${green("api/.env.json")} was created successfully!`);
    }

    // Create `admin` .env.json
    const adminEnvJsonPath = path.resolve(PROJECT_FOLDER, "apps", "admin", ".env.json");
    const exampleAdminEnvJsonPath = path.resolve(
        PROJECT_FOLDER,
        "apps",
        "admin",
        "example.env.json"
    );
    if (fs.existsSync(adminEnvJsonPath)) {
        console.log(`⚠️  ${green("apps/admin/.env.json")} already exists, skipping.`);
    } else {
        fs.copyFileSync(exampleAdminEnvJsonPath, adminEnvJsonPath);
        console.log(`✅️ ${green("apps/admin/.env.json")} was created successfully!`);
    }

    // Create `site` .env.json
    const siteEnvJsonPath = path.resolve(PROJECT_FOLDER, "apps", "site", ".env.json");
    const exampleSiteEnvJsonPath = path.resolve(PROJECT_FOLDER, "apps", "site", "example.env.json");
    if (fs.existsSync(siteEnvJsonPath)) {
        console.log(`⚠️  ${green("apps/site/.env.json")} already exists, skipping.`);
    } else {
        fs.copyFileSync(exampleSiteEnvJsonPath, siteEnvJsonPath);
        console.log(`✅️ ${green("apps/site/.env.json")} was created successfully!`);
    }

    console.log(`\n🏁 Your repo is almost ready!`);
    console.log(
        `Update ${green(
            ".env.json"
        )} with your MongoDB connection string and you're ready to develop!\n`
    );
})();
