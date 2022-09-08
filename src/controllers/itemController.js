const Menu = require("../models/itemModel")

exports.create = (req, res) => {
    const menu = new Menu({
        itemName: req.body.itemName,
        itemPrice: req.body.itemPrice,
        category: req.body.category,
        availability: req.body.availability
    })

    menu.save()
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        res.status(500)
        .send("Error creating the item.")
    })
}

exports.update = (req, res) => {
    Menu.findOneAndUpdate({_id: req.params.menuID}, req.body, {new: true, useFindAndModify: false}, (err, data) => {
        if(err)
            res.status(500).send(err)
        res.json(data)
    })
}

exports.delete = (req, res) => {
    Menu.deleteOne({_id: req.params.menuID}, (err) => {
        if(err)
            res.status(500).send(err)
        res.send("Item Deleted Successfully!!")
    })
}

exports.returnAll = (req, res) => {
    Menu.find({}, (err, data) => {
        if(err)
            res.status(500).send(err)
        res.json(data)
    })
}

exports.returnOne = (req, res) => {
    Menu.findById(req.params.menuID, (err, data) => {
        if(err)
            res.status(500).send(err)
        res.json(data)
    })
}