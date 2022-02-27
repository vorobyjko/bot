const { MongoClient } = require("mongodb");

class MongoRepository {
    constructor() {
        this.connection = 'mongodb+srv://admin_volunteer:qULwOngNGT8BLjWm@volunteerprod.rlcb4.mongodb.net' +
            '/VolunteerDb?retryWrites=true&w=majority';
        this.db = 'VolunteerDb';
        this.collection = 'requests';
        this.client = new MongoClient(this.connection);
    }
    async insertRequest(newRequest) {
        try {
            await this.client.connect();
            const database = this.client.db(this.db);
            const requests = database.collection(this.collection);
            const addedItem = await requests.insertOne(newRequest);
            return addedItem;
        } finally {
            await this.client.close();
        }
    }
}

module.exports = MongoRepository;