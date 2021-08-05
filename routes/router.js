let express = require("express")
let router = express.Router();
const bodyParser = require("body-parser");
const { register, login,viewDetails } = require("../controllers/user.controller");
const { verifyToken } = require("../middelware/middelware");
router.use(
    bodyParser.urlencoded({
        extended:true,
    })
)
router.use(express.json())
router.post('/registerUser',register)
router.post('/loginUser',login)

router.get('/detail',verifyToken,viewDetails)

module.exports = router;