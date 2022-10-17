import 'dotenv/config';

const config = {
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    EMAIL_ETH_HOST: process.env.EMAIL_ETH_HOST,
    EMAIL_ETH_PORT: process.env.EMAIL_ETH_PORT,
    EMAIL_ETH_USER: process.env.EMAIL_ETH_USER,
    EMAIL_ETH_PASS: process.env.EMAIL_ETH_PASS,

}

export default config;