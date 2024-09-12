const User = require('../models/user')
async function handlerGetAllUsers(req,res){
    const allDbUsers = await User.find({})
    return res.json(allDbUsers);
}
async function handlerGetUserById(req,res){
    const user = await User.findById(req.params.id)
    if (!user) res.status('404').json({ error: "user not found" })
    return res.json(user)
}
async function handlerUpdateUserById(req,res){
    await User.findByIdAndUpdate(req.params.id, { last_name: "Changed" })
    return res.json({ status: 'success' })
}
async function handlerDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: `Deleted ID = ${req.params.id}` })
}
async function handlerCreateNewUser(req,res){
    const body = req.body;
    if (!body.first_name || !body.last_name || !body.gender || !body.email || !body.ip_address || !body.job_title) {
        return res.status('400').json({ msg: "all fields required" })
    }
    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        gender: body.gender,
        ip_address: body.ip_address,
        email: body.email,
        job_title: body.job_title
    })
    console.log("result", result);

    return res.status('201').json({ msg: "success" , id : result._id })
}
module.exports = {
    handlerGetAllUsers,
    handlerGetUserById,
    handlerUpdateUserById,
    handlerDeleteUserById,
    handlerCreateNewUser
}