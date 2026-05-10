const { runAggregation } = require('../lib/aggregator');

runAggregation()
  .then(results => {
    console.log(`Aggregation finished. Added ${results.added} articles.`);
    process.exit(0);
  })
  .catch(err => {
    console.error('Aggregation failed:', err);
    process.exit(1);
  });
