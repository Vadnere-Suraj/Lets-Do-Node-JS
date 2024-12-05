const User = require('../modals/user');

async function getUsers(req, res) {
    const allDBUsers = await User.find({});
    const html = `
    <ul>
        ${allDBUsers.map((user) => `<li>${user.firstname} - ${user.email}</li>`).join("")}
    </ul>
    `
    res.send(html);
}

async function getUser(req, res) {
    const u = await User.findById(req.params.id);

    return res.json(u);
}


async function postUser(req, res) {
    const bod = req.body;
   
    if (!bod || !bod.first_name || !bod.last_name || !bod.email || !bod.jobtitle || !bod.gender) {
        return res.status(400).json({msg : "Please fill all the fields" })
    }

    const result = await User.create({
        firstname : bod.first_name,
        lastname : bod.last_name,
        email : bod.email,
        jobtitle : bod.jobtitle,
        gender : bod.gender
    });

     console.log(result);

    return res.status(201).json({msg : "User created successfully" })
}


async function updateUser(req,res) {
    await User.findByIdAndUpdate(req.params.id, {lastname : "Changed" } )

    return res.json({ status: "Success" })
}


async function deleteUser(req, res) {
    await User.findByIdAndDelete(req.params.id)

    return res.json({msg : "User deleted successfully" })
}


module.exports = {
    getUsers,
    getUser,
    postUser,
    updateUser,
    deleteUser
    }