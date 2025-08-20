const fs = require("fs");

function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    console.log("✅ File read successfully");
    return data;
  } catch (error) {
    console.error("❌ Error reading file:", error.message);
    return null;
  }
}

// Path to write the order ID is 
//  C:\\OrderNumbers_Test\\Orders.txt


function writeOrder(filePath, orderId, username) {
  try {
    const now = new Date();
    const dateTime = now.toISOString(); // timestamp
    const logLine = orderId + " | " + dateTime + " | " + username + "\n";

    fs.appendFileSync(filePath, logLine, "utf-8"); // append instead of overwrite
    console.log("✅ Order logged: " + logLine.trim());
  } catch (error) {
    console.error("❌ Error writing order ID:", error.message);
  }
}

module.exports = { readFile, writeOrder };