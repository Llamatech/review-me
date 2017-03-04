
// Must set URL as System environment variable
const mongo_url = process.env.MONGO_URL

exports.database = (db) => {
    return 'mongodb://'+mongo_url+'/'+db;
}
