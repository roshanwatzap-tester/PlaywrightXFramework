const mysql = require('mysql2/promise');
const config = require('../Config/config'); // import environment config

// Get first record from test_data
async function getRecord() {
  const connection = await mysql.createConnection(config.db);
  const [rows] = await connection.execute('SELECT * FROM test_data LIMIT 1');
  await connection.end();
  return rows[0]; // return the first row
}

// Insert a record into order_logs
async function putRecord(orderId, timestamps, testerName,browserName, TC_name, runId) {
  const connection = await mysql.createConnection(config.db);
  await connection.execute(
    'INSERT INTO order_logs (Order_id, timestamps, testername,browserName,testcase_name,runId) VALUES (?, ?, ?, ?, ?, ?)',
    [orderId, timestamps, testerName,browserName, TC_name, runId]
  );
  await connection.end();
}

module.exports = { getRecord, putRecord };
