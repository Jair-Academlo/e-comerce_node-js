const { app } = require('./app');
require('colors');

// Init models relations function
const { initModels } = require('./models/initModels');

// Utils
const { db } = require('./utils/database.util');

const startServer = async () => {
  try {
    await db.authenticate();
    console.log('Database authenticated'.magenta);

    // Establish model's relations
    initModels();

    await db.sync({ force: false });
    console.log('Database synced'.yellow);

    const PORT = process.env.PORT || 4000;

    // Start server
    app.listen(PORT, () => console.log('Server on port'.green, PORT.cyan));
  } catch (err) {
    console.log(err);
  }
};

startServer();
