const bcrypt = require("bcryptjs");
const { Toy } = require("../models/Toys.model");
const { validateToy, validPatchToy } = require("../validation/toyValidation");
const { Types } = require("mongoose");

exports.getToys = async (req, res, next) => {
    const { query } = req;
    try {
        const perPage = 10;
        const page = req.query.page || 1;
        const skip = (page - 1) * perPage;
        const tasks = await Toy.find({})
            .populate('user_id')
            .skip(skip)
            .limit(perPage);
        res.send(tasks);
    } catch (error) {
        console.log(error);
        res.sendStatus(400)
    }
}

exports.getToysByUserId = async (req, res, next) => {
    
    try {
        const { id } = req.params;
        const perPage = 10;
        const page = req.query.page || 1;
        const skip = (page - 1) * perPage;
        const toy = await Toy.find({ user_id: id })
            .populate('user_id')
            .skip(skip)
            .limit(perPage);
        res.send(toy);
    } catch (error) {
        console.log(error);
        res.sendStatus(400)
    }
}

exports.searchToys = async (req, res, next) => {
    try {
        const { query } = req;
        const { s } = query;
        console.log({s});
        const perPage = 10;
        const page = req.query.page || 1;
        const skip = (page - 1) * perPage;
        const toys = await Toy.find({ $or: [{ name: s }, { info: s }]})
            .populate('user_id')
            .skip(skip)
            .limit(perPage);
        res.send(toys);
    
    } catch (error) {
        next(error)
    }


}

exports.getToyByCategory = async (req, res, next) => {
    try {
        const category = req.params.catname;
        const perPage = 10;
        const page = req.query.page || 1;
        const skip = (page - 1) * perPage;
        const tasks = await Toy.find({ category: category })
            .populate('user_id')
            .skip(skip)
            .limit(perPage);
        res.send(tasks);
    } catch (error) {
        console.log(error);
        res.sendStatus(400)
    }

}

exports.getSingleToy = async (req, res, next) => {
    try {
        const { id } = req.params;
        let singleToy = await Toy.findOne({id: id});
        res.send(singleToy);
        
    } catch (error) {
        next(error)
    }

}

exports.addToy = async (req, res, next) => {
    const body = req.body;
    console.log(res);
    const userId = res.locals.user_id;
    try {
        const validate = validateToy(body);
        if (validate.error) {
            throw Error(validate.error)
        }

        const newToy = new Toy(body);
        newToy.user_id = new Types.ObjectId(userId);
        await newToy.save();
        res.status(201).send(newToy);
    } catch (error) {
        next(error);
    }

}

exports.patchToy = async (req, res, next) => {
    
    const { idEdit } = req.params;
    const userId = res.locals.user_id;
    const body = req.body;
    const options = { new: true }
    try {
        const validate = validPatchToy(body);
        if (validate.error) {
            throw Error(validate.error)
        }
        let patchToy = await Toy.findOne({id: idEdit});
        if(!patchToy){
            throw new Error("the toy is not exist")
        }

        if (String(patchToy.user_id) !== String(userId)) {
            throw new Error("you are not the auther")
        }
        patchToy = await Toy.findByIdAndUpdate(idEdit, body, options);
        res.send(patchToy)
    } catch (error) {
        next(error)
    }

}

exports.deleteToy = async (req, res, next) => {
    const { idDelete } = req.params;
    const userId = res.locals.user_id;
    try {
        let deletedToy = await Toy.findOne({id: idDelete});
        if(!deletedToy){
            throw new Error("the toy is not exist")
        }

        if (String(deletedToy.user_id) !== String(userId)) {
            throw new Error("you are not the auther")
        }
        
        deletedToy = await Toy.findOneAndDelete({ id: idDelete });
        res.send(deletedToy)
    } catch (error) {
        next(error)
    }

}


