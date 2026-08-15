import { MongoClient } from "mongodb";
import mysql from "mysql2/promise";

const uri = process.env.MONGODB_URI;
let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

// Persistent cloud storage blobs on extendsclass.com (zero-config synchronization fallback)
const BINS: Record<string, string> = {
  orders: "https://extendsclass.com/api/json-storage/bin/adbbfce",
  inquiries: "https://extendsclass.com/api/json-storage/bin/fefebbe",
  staff: "https://extendsclass.com/api/json-storage/bin/fcffbac",
  threats: "https://extendsclass.com/api/json-storage/bin/cbdcace",
};

// MySQL configuration params
const mysqlUrl = process.env.MYSQL_URL;
const mysqlHost = process.env.MYSQL_HOST;
const mysqlUser = process.env.MYSQL_USER;
const mysqlPassword = process.env.MYSQL_PASSWORD;
const mysqlDatabase = process.env.MYSQL_DATABASE;
const mysqlPort = process.env.MYSQL_PORT || "3306";

let pool: mysql.Pool | null = null;
let mysqlInitialized = false;

// Mock data structures
const mockOrders: any[] = [];

const mockInquiries: any[] = [];

// Helper functions for MongoDB
export async function getCollection(collectionName: string) {
  if (uri) {
    try {
      if (!client) {
        client = new MongoClient(uri, {
          connectTimeoutMS: 5000,
          socketTimeoutMS: 5000,
        });
        clientPromise = client.connect();
      }
      if (clientPromise) {
        const connectedClient = await clientPromise;
        if (connectedClient) {
          return connectedClient.db().collection(collectionName);
        }
      }
    } catch (e) {
      console.error("MongoDB Connection failed, falling back to JSON Blob store:", e);
    }
  }
  return null;
}

// Helper functions for JSON Blob Sync Fallback
export async function getKvData(key: string): Promise<any[]> {
  const url = BINS[key];
  if (!url) return [];

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      console.error(`ExtendsClass read failed for key ${key} with status ${res.status}`);
      return [];
    }
    const text = await res.text();
    const parsed = JSON.parse(text || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error(`JSON Blob read failed for key ${key}:`, e);
    return [];
  }
}

export async function saveKvData(key: string, data: any[]): Promise<boolean> {
  const url = BINS[key];
  if (!url) return false;

  try {
    const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });
    return res.ok;
  } catch (e) {
    console.error(`JSON Blob write failed for key ${key}:`, e);
    return false;
  }
}

// Helper functions for MySQL
export async function getMysqlPool() {
  if (pool) return pool;

  const hasConfig = mysqlUrl || (mysqlHost && mysqlUser && mysqlPassword && mysqlDatabase);
  if (!hasConfig) return null;

  try {
    const config: any = mysqlUrl
      ? { uri: mysqlUrl }
      : {
          host: mysqlHost,
          user: mysqlUser,
          password: mysqlPassword,
          database: mysqlDatabase,
          port: parseInt(mysqlPort, 10),
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
        };

    pool = mysqlUrl ? mysql.createPool(mysqlUrl) : mysql.createPool(config);

    if (!mysqlInitialized) {
      const conn = await pool.getConnection();
      try {
        await conn.query(`
          CREATE TABLE IF NOT EXISTS orders (
            id VARCHAR(255) PRIMARY KEY,
            customerName VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(255) NOT NULL,
            organization VARCHAR(255) NOT NULL,
            address TEXT NOT NULL,
            capacity VARCHAR(50) NOT NULL,
            quantity INT NOT NULL,
            comments TEXT,
            status VARCHAR(50) DEFAULT 'Pending',
            date VARCHAR(255) NOT NULL,
            unitPrice DOUBLE,
            totalPrice DOUBLE
          )
        `);

        await conn.query(`
          CREATE TABLE IF NOT EXISTS inquiries (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(255),
            organization VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            status VARCHAR(50) DEFAULT 'Unread',
            date VARCHAR(255) NOT NULL
          )
        `);

        await conn.query(`
          CREATE TABLE IF NOT EXISTS staff_users (
            username VARCHAR(255) PRIMARY KEY,
            password VARCHAR(255) NOT NULL,
            access_orders TINYINT NOT NULL DEFAULT 1,
            access_inquiries TINYINT NOT NULL DEFAULT 1
          )
        `);

        await conn.query(`
          CREATE TABLE IF NOT EXISTS threat_logs (
            id VARCHAR(255) PRIMARY KEY,
            type VARCHAR(255) NOT NULL,
            source VARCHAR(255) NOT NULL,
            details TEXT NOT NULL,
            date VARCHAR(255) NOT NULL
          )
        `);

        mysqlInitialized = true;
        console.log("MySQL database initialized successfully.");
      } finally {
        conn.release();
      }
    }

    return pool;
  } catch (e) {
    console.error("MySQL Connection or initialization failed:", e);
    pool = null;
    return null;
  }
}

/* ==========================================================
   ORDER DATA OPERATIONS
   ========================================================== */

export async function queryOrders(): Promise<any[]> {
  const pool = await getMysqlPool();
  if (pool) {
    try {
      const [rows] = await pool.query("SELECT * FROM orders ORDER BY date DESC");
      return rows as any[];
    } catch (e) {
      console.error("MySQL queryOrders failed, falling back:", e);
    }
  }

  const collection = await getCollection("orders");
  if (collection) {
    try {
      const orders = await collection.find({}).sort({ date: -1 }).toArray();
      return orders.map(({ _id, ...rest }) => rest);
    } catch (e) {
      console.error("MongoDB queryOrders failed, falling back:", e);
    }
  }

  let data = await getKvData("orders");
  if (data.length === 0) {
    data = mockOrders;
    await saveKvData("orders", data);
  }
  return data;
}

export async function insertOrder(order: any): Promise<boolean> {
  const pool = await getMysqlPool();
  if (pool) {
    try {
      await pool.query(
        `INSERT INTO orders (id, customerName, email, phone, organization, address, capacity, quantity, comments, status, date, unitPrice, totalPrice) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          order.id,
          order.customerName,
          order.email,
          order.phone,
          order.organization,
          order.address,
          order.capacity,
          order.quantity,
          order.comments || null,
          order.status,
          order.date,
          order.unitPrice || null,
          order.totalPrice || null
        ]
      );
      return true;
    } catch (e) {
      console.error("MySQL insertOrder failed, falling back:", e);
    }
  }

  const collection = await getCollection("orders");
  if (collection) {
    try {
      await collection.insertOne(order);
      return true;
    } catch (e) {
      console.error("MongoDB insertOrder failed, falling back:", e);
    }
  }

  const data = await getKvData("orders");
  data.unshift(order);
  return await saveKvData("orders", data);
}

export async function updateOrderStatus(id: string, status: string): Promise<boolean> {
  const pool = await getMysqlPool();
  if (pool) {
    try {
      await pool.query("UPDATE orders SET status = ? WHERE id = ?", [status, id]);
      return true;
    } catch (e) {
      console.error("MySQL updateOrderStatus failed, falling back:", e);
    }
  }

  const collection = await getCollection("orders");
  if (collection) {
    try {
      await collection.updateOne({ id }, { $set: { status } });
      return true;
    } catch (e) {
      console.error("MongoDB updateOrderStatus failed, falling back:", e);
    }
  }

  const data = await getKvData("orders");
  const updated = data.map((o) => (o.id === id ? { ...o, status } : o));
  return await saveKvData("orders", updated);
}

export async function deleteOrder(id: string): Promise<boolean> {
  const pool = await getMysqlPool();
  if (pool) {
    try {
      await pool.query("DELETE FROM orders WHERE id = ?", [id]);
      return true;
    } catch (e) {
      console.error("MySQL deleteOrder failed, falling back:", e);
    }
  }

  const collection = await getCollection("orders");
  if (collection) {
    try {
      await collection.deleteOne({ id });
      return true;
    } catch (e) {
      console.error("MongoDB deleteOrder failed, falling back:", e);
    }
  }

  const data = await getKvData("orders");
  const filtered = data.filter((o) => o.id !== id);
  return await saveKvData("orders", filtered);
}

/* ==========================================================
   INQUIRY DATA OPERATIONS
   ========================================================== */

export async function queryInquiries(): Promise<any[]> {
  const pool = await getMysqlPool();
  if (pool) {
    try {
      const [rows] = await pool.query("SELECT * FROM inquiries ORDER BY date DESC");
      return rows as any[];
    } catch (e) {
      console.error("MySQL queryInquiries failed, falling back:", e);
    }
  }

  const collection = await getCollection("inquiries");
  if (collection) {
    try {
      const inquiries = await collection.find({}).sort({ date: -1 }).toArray();
      return inquiries.map(({ _id, ...rest }) => rest);
    } catch (e) {
      console.error("MongoDB queryInquiries failed, falling back:", e);
    }
  }

  let data = await getKvData("inquiries");
  if (data.length === 0) {
    data = mockInquiries;
    await saveKvData("inquiries", data);
  }
  return data;
}

export async function insertInquiry(inquiry: any): Promise<boolean> {
  const pool = await getMysqlPool();
  if (pool) {
    try {
      await pool.query(
        `INSERT INTO inquiries (id, name, email, phone, organization, message, status, date) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          inquiry.id,
          inquiry.name,
          inquiry.email,
          inquiry.phone || null,
          inquiry.organization,
          inquiry.message,
          inquiry.status,
          inquiry.date
        ]
      );
      return true;
    } catch (e) {
      console.error("MySQL insertInquiry failed, falling back:", e);
    }
  }

  const collection = await getCollection("inquiries");
  if (collection) {
    try {
      await collection.insertOne(inquiry);
      return true;
    } catch (e) {
      console.error("MongoDB insertInquiry failed, falling back:", e);
    }
  }

  const data = await getKvData("inquiries");
  data.unshift(inquiry);
  return await saveKvData("inquiries", data);
}

export async function updateInquiryStatus(id: string, status: string): Promise<boolean> {
  const pool = await getMysqlPool();
  if (pool) {
    try {
      await pool.query("UPDATE inquiries SET status = ? WHERE id = ?", [status, id]);
      return true;
    } catch (e) {
      console.error("MySQL updateInquiryStatus failed, falling back:", e);
    }
  }

  const collection = await getCollection("inquiries");
  if (collection) {
    try {
      await collection.updateOne({ id }, { $set: { status } });
      return true;
    } catch (e) {
      console.error("MongoDB updateInquiryStatus failed, falling back:", e);
    }
  }

  const data = await getKvData("inquiries");
  const updated = data.map((i) => (i.id === id ? { ...i, status } : i));
  return await saveKvData("inquiries", updated);
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const pool = await getMysqlPool();
  if (pool) {
    try {
      await pool.query("DELETE FROM inquiries WHERE id = ?", [id]);
      return true;
    } catch (e) {
      console.error("MySQL deleteInquiry failed, falling back:", e);
    }
  }

  const collection = await getCollection("inquiries");
  if (collection) {
    try {
      await collection.deleteOne({ id });
      return true;
    } catch (e) {
      console.error("MongoDB deleteInquiry failed, falling back:", e);
    }
  }

  const data = await getKvData("inquiries");
  const filtered = data.filter((i) => i.id !== id);
  return await saveKvData("inquiries", filtered);
}

/* ==========================================================
   STAFF USERS & THREAT LOGS OPERATIONS
   ========================================================== */

export async function queryStaffUsers(): Promise<any[]> {
  const pool = await getMysqlPool();
  if (pool) {
    try {
      const [rows] = await pool.query("SELECT * FROM staff_users");
      return rows as any[];
    } catch (e) {
      console.error("MySQL queryStaffUsers failed, falling back:", e);
    }
  }

  const collection = await getCollection("staff_users");
  if (collection) {
    try {
      const users = await collection.find({}).toArray();
      return users.map(({ _id, ...rest }) => rest);
    } catch (e) {
      console.error("MongoDB queryStaffUsers failed, falling back:", e);
    }
  }

  return await getKvData("staff");
}

export async function insertStaffUser(user: any): Promise<boolean> {
  const pool = await getMysqlPool();
  if (pool) {
    try {
      await pool.query(
        "INSERT INTO staff_users (username, password, access_orders, access_inquiries) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE password = VALUES(password), access_orders = VALUES(access_orders), access_inquiries = VALUES(access_inquiries)",
        [user.username, user.password, user.access_orders ? 1 : 0, user.access_inquiries ? 1 : 0]
      );
      return true;
    } catch (e) {
      console.error("MySQL insertStaffUser failed, falling back:", e);
    }
  }

  const collection = await getCollection("staff_users");
  if (collection) {
    try {
      await collection.updateOne({ username: user.username }, { $set: user }, { upsert: true });
      return true;
    } catch (e) {
      console.error("MongoDB insertStaffUser failed, falling back:", e);
    }
  }

  const data = await getKvData("staff");
  const filtered = data.filter((u) => u.username !== user.username);
  filtered.push(user);
  return await saveKvData("staff", filtered);
}

export async function deleteStaffUser(username: string): Promise<boolean> {
  const pool = await getMysqlPool();
  if (pool) {
    try {
      await pool.query("DELETE FROM staff_users WHERE username = ?", [username]);
      return true;
    } catch (e) {
      console.error("MySQL deleteStaffUser failed, falling back:", e);
    }
  }

  const collection = await getCollection("staff_users");
  if (collection) {
    try {
      await collection.deleteOne({ username });
      return true;
    } catch (e) {
      console.error("MongoDB deleteStaffUser failed, falling back:", e);
    }
  }

  const data = await getKvData("staff");
  const filtered = data.filter((u) => u.username !== username);
  return await saveKvData("staff", filtered);
}

export async function queryThreats(): Promise<any[]> {
  const pool = await getMysqlPool();
  if (pool) {
    try {
      const [rows] = await pool.query("SELECT * FROM threat_logs ORDER BY date DESC");
      return rows as any[];
    } catch (e) {
      console.error("MySQL queryThreats failed, falling back:", e);
    }
  }

  const collection = await getCollection("threat_logs");
  if (collection) {
    try {
      const threats = await collection.find({}).sort({ date: -1 }).toArray();
      return threats.map(({ _id, ...rest }) => rest);
    } catch (e) {
      console.error("MongoDB queryThreats failed, falling back:", e);
    }
  }

  return await getKvData("threats");
}

export async function insertThreat(threat: any): Promise<boolean> {
  const pool = await getMysqlPool();
  if (pool) {
    try {
      await pool.query(
        "INSERT INTO threat_logs (id, type, source, details, date) VALUES (?, ?, ?, ?, ?)",
        [threat.id, threat.type, threat.source, threat.details, threat.date]
      );
      return true;
    } catch (e) {
      console.error("MySQL insertThreat failed, falling back:", e);
    }
  }

  const collection = await getCollection("threat_logs");
  if (collection) {
    try {
      await collection.insertOne(threat);
      return true;
    } catch (e) {
      console.error("MongoDB insertThreat failed, falling back:", e);
    }
  }

  const data = await getKvData("threats");
  data.unshift(threat);
  return await saveKvData("threats", data);
}
