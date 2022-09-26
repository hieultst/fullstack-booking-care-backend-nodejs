import db from "../models/index";

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.name ||
                !data.address ||
                !data.imageBase64 ||
                !data.descriptionHTML ||
                !data.descriptionMarkdown
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters !",
                });
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                });

                resolve({
                    errCode: 0,
                    errMessage: "Oke",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll();

            if (data && data.length > 0) {
                data.map((item) => {
                    item.image = new Buffer(item.image, "base64").toString(
                        "binary"
                    );
                    return item;
                });
            }
            resolve({
                errCode: 0,
                errMessage: "Oke",
                data: data,
            });
        } catch (error) {
            reject(error);
        }
    });
};

let getDetailClinicById = (id, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !location) {
                resolve({
                    errCode: -1,
                    errMessage: "Missing required parameters !",
                });
            } else {
                let data = await db.Clinic.findOne({
                    where: {
                        id: id,
                    },
                    attributes: ["descriptionHTML", "descriptionMarkdown"],
                });

                if (data) {
                    let doctorClinic = [];
                    if (location === "ALL") {
                        doctorClinic = await db.Doctor_infor.findAll({
                            where: { clinicId: id },
                            attributes: ["doctorId", "provinceId"],
                        });
                    } else {
                        doctorClinic = await db.Doctor_infor.findAll({
                            where: { clinicId: id, provinceId: location },
                            attributes: ["doctorId", "provinceId"],
                        });
                    }
                    data.doctorClinic = doctorClinic;
                } else data = {};
                resolve({
                    errCode: 0,
                    errMessage: "Oke",
                    data: data,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createClinic,
    // getAllClinic,
    // getDetailClinicById,
};
