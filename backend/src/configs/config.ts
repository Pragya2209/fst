export const envConfig = () => ({
    port: parseInt(process.env.PORT, 10) || 5000,
    mongooseConnectionUri: process.env.MONGOOSE_CONNECTION_URI,
    byCryptSalt: parseInt(process.env.BCRYPT_SALT, 10) || 10,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRATION,
    throttleTtl: parseInt(process.env.THROTTLE_TTL, 10) || 6000,
    throttleLimit: parseInt(process.env.THROTTLE_LIMIT, 10) || 10
})