const { exec } = require('child_process');
const path = require('path');

const INTERVAL = 20 * 60 * 1000; // 20 minutes

function runAggregation() {
  console.log(`[${new Date().toISOString()}] Starting scheduled aggregation...`);
  const scriptPath = path.join(__dirname, 'aggregate.js');
  
  exec(`node ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`[${new Date().toISOString()}] Error during aggregation:`, error);
      return;
    }
    if (stderr) {
      console.error(`[${new Date().toISOString()}] Aggregation stderr:`, stderr);
    }
    console.log(`[${new Date().toISOString()}] Aggregation stdout:`, stdout);
    console.log(`[${new Date().toISOString()}] Aggregation finished. Next run in 20 minutes.`);
  });
}

// Run immediately on start
runAggregation();

// Then run every INTERVAL
setInterval(runAggregation, INTERVAL);

console.log('Scheduler started. Will run aggregation every 20 minutes.');
