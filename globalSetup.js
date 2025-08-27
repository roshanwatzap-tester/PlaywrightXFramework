// globalSetup.js
module.exports = async () => {
  const runId = Math.random().toString(36).slice(2, 12);
  process.env.GLOBAL_RUN_ID = runId;
  console.log("💽🚀 Global Run ID (set in globalSetup):", runId);
};
