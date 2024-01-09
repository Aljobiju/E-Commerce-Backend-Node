import { Config } from "../types/configTypes";


const config:Config={
    development:{
        mongoURI:`mongodb+srv://aljovadackel:Password@cluster0.mvtcnvz.mongodb.net/?retryWrites=true&w=majority`,
        port:3000,
        secretKey:`your-secret-key`,
    },
    production:{
        mongoURI:`your_mongo_URI`,
        port:8080,
        secretKey:``,
    },
};
export default config;