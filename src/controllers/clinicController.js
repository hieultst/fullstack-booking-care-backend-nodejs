import clinicService from "../services/clinicService";

let createClinic = async (req, res) => {
    try {
        let response = await clinicService.createClinic(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(2002).json({
            errCode: -1,
            errMessage: "Error from server...",
        });
    }
};

let getAllClinic = async (req, res) => {
    try {
        let response = await clinicService.getAllClinic();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(2002).json({
            errCode: -1,
            errMessage: "Error from server...",
        });
    }
};

let getDetailClinicById = async (req, res) => {
    try {
        let response = await clinicService.getDetailClinicById(
            req.query.id,
            req.query.location
        );
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(2002).json({
            errCode: -1,
            errMessage: "Error from server...",
        });
    }
};

module.exports = {
    createClinic,
    // getAllClinic,
    // getDetailClinicById,
};
