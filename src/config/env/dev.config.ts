export default () => ({
    port: process.env.PORT,
    db: {
        url: process.env.DB_URL,
    },
    access: {
        jwt_secret: process.env.JWT_SECRET,
    },
    stripe: {
        secret_key: process.env.STRIPE_SECRET_KEY,
        publish_key: process.env.STRIPE_PUBLISH_KEY,
        success_url:process.env.SUCCESS_URL,
        canceled_url:process.env.CANCEL_URL,

    },
});
//func ret obj