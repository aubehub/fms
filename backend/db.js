import mysql from "mysql";

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'aub',
  password: '159753',
  database: 'fms'
});


connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');

});
export default connection;