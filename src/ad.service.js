import "firebase/auth"
const db = firebase.ref("/rpitest");

class AdDataService {
    getAll() {
        return db;
    }

    create(ad) {
        return db.push(ad);
    }

    update(key, value) {
        return db.child(key).update(value);
    }

    delete(key) {
        return db.child(key).remove();
    }

    deleteAll() {
        return db.remove();
    }
}

export default new AdDataService();
