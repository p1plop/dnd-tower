const admin = require('./node_modules/firebase-admin');
// этого json нет в репозитории из соображений безопасности. перед загрузкой его необходимо получить и добавить в папку firebase_upload
const serviceAccount = require("./serviceAccountKey.json");

const PHB = require("./src/PHB.json");
const XGE = require("./src/XGE.json");
const TCE = require("./src/TCE.json");
const AI = require('./src/AI.json');
const EGW = require('./src/EGW.json');
const FTD = require('./src/FTD.json');
const IDRF = require('./src/IDRF.json');
const LLK = require('./src/LLK.json');

// Закоментированны уже загруженные списки заклинаний, если нужно внести новый или исправить существующий,
// то раскомментируй/добавь запись в этом массиве
const documents = [
    // { key: 'PHB', data: PHB },
    // { key: 'XGE', data: XGE },
    // { key: 'TCE', data: TCE },
    // { key: 'AI', data: AI },
    // { key: 'EGW', data: EGW },
    // { key: 'FTD', data: FTD },
    // { key: 'IDRF', data: IDRF },
    // { key: 'LLK', data: LLK },
];

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://your-database.firebaseio.com"
});

const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
for (document of documents) {
    if (document.data && (typeof document.data === "object")) {
        firestore.collection('spells').doc(document.key).set(document.data).then((res) => {
            console.log("Document successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    }
}