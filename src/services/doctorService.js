import db from "../models/index";
import bcrypt from "bcryptjs";

let getTopDoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limit,
                where: { roleId: "R2" },
                order: [["createdAt", "DESC"]],
                attributes: {
                    exclude: ["password", "image"],
                },
                include: [
                    {
                        model: db.Allcode,
                        as: "positionData",
                        attributes: ["valueEn", "valueVi"],
                    },
                    {
                        model: db.Allcode,
                        as: "genderData",
                        attributes: ["valueEn", "valueVi"],
                    },
                ],
                raw: true,
                nest: true,
            });
            resolve({
                data: users,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
};
