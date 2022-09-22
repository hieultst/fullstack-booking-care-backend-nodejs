import patientService from "../services/patientService";

let postBookAppointment = async (req, res) => {
    try {
        let response = await patientService.postBookAppointment(req.body);
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
    postBookAppointment,
};
