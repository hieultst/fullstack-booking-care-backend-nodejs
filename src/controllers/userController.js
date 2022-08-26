import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing input parameters!",
        });
    }

    let userData = await userService.handleUserLogin(email, password);
    // // Check email exist
    // // Compare password
    // // Return userInfor
    // // Access_tole: JWT json web token
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        ussr: userData.user ? userData.user : {},
    });
};

let handleGetAlluser = async (req, res) => {
    let id = req.query.id; // all, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter",
            users: [],
        });
    }
    let users = await userService.getAllUser(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: "oke",
        users,
    });
};

let handleCraeteNewUser = async (req, res) => {
    let data = req.body;
    let message = await userService.createNewUser(data);
    return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
    let userData = req.body;
    let message = await userService.updateUser(userData);
    return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
    let userId = req.body.id;
    if (!userId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!",
        });
    }
    let message = await userService.deleteUser(userId);
    return res.status(200).json(message);
};

module.exports = {
    handleLogin: handleLogin,
    handleGetAlluser: handleGetAlluser,
    handleCraeteNewUser: handleCraeteNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
};
