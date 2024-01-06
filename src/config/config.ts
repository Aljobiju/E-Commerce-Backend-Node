const config = {
  database: {
    host: "127.0.0.1",

    user: "root",

    password: "Visualisation@123",

    database: "e_commerce",

    connectionLimit: 10, // Adjust as needed

    port: 3306,

    insecureAuth: true,
  },
  server: {
    port: 3000,
  },
};

module.exports = config;
