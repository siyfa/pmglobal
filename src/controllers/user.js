const express = require('express');
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");

const router = express.Router();

//delete a user
router.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id;

        const user = await UserModel.findById(id);

        if(!user){
            return res.status(404).json({"message": "User with this id does not exist"})
        }else{        
            await UserModel.deleteOne({_id: id});

            return res.status(200).json({"message": "User succesfully deleted"})
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({"message": "An error has occured"})
    }
})

//edit a user
router.put("/:id",async (req, res) => {
    try {
        let id = req.params.id;
        let {firstname, lastname, gender, date_of_birth} = req.body;

        const user = await UserModel.findById(id);

        if(!user){
            return res.status(404).json({"message": "User does not exist"})
        }

        if(firstname){
            user.firstname = firstname;
        }

        if(lastname){
            user.lastname = lastname;
        }

        if(gender){
            user.gender = gender;
        }

        if(date_of_birth){
            user.date_of_birth = date_of_birth
        }

        await UserModel.updateOne({_id: id}, user);

        const updatedUser = await UserModel.findById(id);

        const data = {
            id: updatedUser._id,
            firstname: updatedUser.firstname,
            lastname: updatedUser.lastname,
            gender: updatedUser.gender,
            date_of_birth: updatedUser.date_of_birth
        }

        return res.status(200).json({"message": "User succesfully updated", "data": data})

    } catch (error) {
        console.log(error)
        return res.status(500).json({"message": "An error has occured"})
    }

})

//get a user
router.get("/:id", async(req, res) => {
    try {
        let id =  req.params.id;

        const user = await UserModel.findById(id);
        
        if(!user){
            return res.status(404).json({"message": "User does not exist"})
        }

        let data = {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            gender: user.gender,
            date_of_birth: user.date_of_birth,
            date_created: user.createdAt,
            date_updated: user.updatedAt
        }

        return res.status(200).json({"data": data})

    } catch (error) {
        console.log(error)
        return res.status(500).json({"message": "An error has occured"})
    }
})

//filter users
router.get("/", async (req, res) => {

    try {
        let {
            filter_field, filter_value, page, pageSize, sort_order_mode, sort_field 
         } = req.query;
        
        let filter = {};
        let sort = {};
        let sortBy = 1;
        let limit = pageSize ? parseInt(pageSize) : 25;
        
        if(!page){
            page = 1
        }

        if(filter_field && filter_value){
            filter = {field: filter_value}
            filter[`${filter_field}`] = filter['field'];
            delete filter['field'];
        }

        if(sort_order_mode == "desc"){
            sortBy = -1;
        }

        if(sort_field){
            sort = { field: sortBy }
            sort[`${sort_field}`] = sort['field'];
            delete sort['field'];
        }

        //find user
        const users = await UserModel.find(filter)
                    .sort(sort)
                    .limit(limit * 1)
                    .skip((page - 1) * limit)
                    .exec()

        const count = await UserModel.countDocuments(filter);

        const data = users.map((user) => {
            let data = {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                gender: user.gender,
                date_of_birth: user.date_of_birth,
                date_created: user.createdAt,
                date_updated: user.updatedAt
            }
            return data;
        })

        return res.status(200).json({
            totalpages: Math.ceil(count/limit),
            page_size: count,
            currentpage: page,
            data: data,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({"message": "An error has occured"})
    }
})

//login a user
router.post("/login", async(req, res) => {
    try {
        let {username, password} = req.body;

        if(!username, !password){
            return res.status(400).json({"message": "All fields are required"})
        }

        const user = await UserModel.findOne({username})
        !user && res.status(404).json({"message": "User not found"});

        const validPassword = await bcrypt.compare(password, user.password);
        !validPassword && res.status(400).json({"message": "Wrong password"});

        const data = {
            id: user._id,
            username: username,
            firstname: user.firstname,
            lastname: user.lastname,
            gender: user.gender,
            date_of_birth: user.date_of_birth,
            date_created: user.createdAt,
            date_updated: user.updatedAt
        }

        return res.status(200).json({"message": "Successfully login", data: data})

    } catch (error) {
        console.log(error)
        return res.status(500).json({"message": "An error has occured"})
    }
})

//create a user
router.post("/", async (req, res) => {
    try {
        let {username,firstname, lastname, password, gender, date_of_birth } = req.body;

        if(!username,!firstname, !lastname, !password, !gender, !date_of_birth){
            return res.status(400).json({"message": "All fields are required"})
        }
        
        const finduser = await UserModel.findOne({username: username,});

        if(finduser){
            return res.status(400).json({"message": "User with this username already exist"})
        }

        //create a new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await new UserModel({
            username,
            firstname,
            lastname,
            gender,
            password: hashedPassword,
            date_of_birth
        })

        const user = await newUser.save();
        
        const data = {
            id: user._id,
            username: username,
            firstname: user.firstname,
            lastname: user.lastname,
            gender: user.gender,
            date_of_birth: user.date_of_birth,
            date_created: user.createdAt,
            date_updated: user.updatedAt
        }
        
        return res.status(200).json({"data": data});
    } catch (error) {
        console.log(error)
        return res.status(500).json({"message": "An error has occured"})
    }
})

module.exports = router