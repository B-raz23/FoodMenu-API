const { json } = require('body-parser')

module.exports = app => {

    const menus = require('../controllers/itemController')
    const users = require('../controllers/userController')

    app.post("/register", users.registerUser)
    app.post("/login", users.loginUser)
    app.post("/menus", users.checkUser, menus.create)
    app.put("/menus/:menuID", users.checkUser, menus.update)
    app.delete("/menus/:menuID", users.checkUser, menus.delete)
    app.get("/menus/:menuID", users.checkUser, menus.returnOne)
    app.get("/menus", users.checkUser, menus.returnAll)
}