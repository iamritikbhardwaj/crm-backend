import sequelize from "./dbConfig.js";// Adjust to your Sequelize instance

async function resetDatabase() {
  try {
    // Disable foreign key constraints temporarily
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;', { raw: true });

    // Sync the models and drop all tables
    await sequelize.sync({ force: true });  // This will drop and recreate all tables

    // Re-enable foreign key constraints
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;', { raw: true });

    console.log('Database reset successfully!');
  } catch (error) {
    console.error('Error resetting the database:', error);
  }
}

export default resetDatabase;
