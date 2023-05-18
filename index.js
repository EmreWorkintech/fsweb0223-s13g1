const server = require('./api/server');
const { PORT } = require('./config/config');

console.log("env:", process.env.PORT);
console.log(PORT);
server.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
})