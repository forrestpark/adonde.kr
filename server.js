const app = require('./app.js');
const port = process.env.PORT || 3000;

console.log("process.env.PORT: ", process.env.PORT)

app.listen( port, function() {
    console.log('Express listening on port', port);
});