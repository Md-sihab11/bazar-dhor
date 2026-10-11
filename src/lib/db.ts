import { MongoClient } from "mongodb";
import { setServers } from "node:dns";

// import dns from "node:dns";
// dns.setServers(["8.8.8.8", "1.1.1.1"]);

const uri = process.env.MONGO_DB_URL;

if (!uri) {
  throw new Error("MONGO_DB_URL is missing");
}

let dnsFixed = false;
function ensureDns() {
  if (!dnsFixed) {
    try {
      setServers(["8.8.8.8", "1.1.1.1"]);
    } catch {
      // ignore – may already be set or unavailable in edge runtime
    }
    dnsFixed = true;
  }
}

const client = new MongoClient(uri);

const originalConnect = client.connect.bind(client);
client.connect = async function () {
  ensureDns();
  return originalConnect();
};

export default client;
