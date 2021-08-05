let express = require("express")

var app = express();
app.use(require("./routes/router"));
let port =4501;

app.listen(port,()=>{
    console.log(`Server  Started At ${port}`)
})

module.exports = app;