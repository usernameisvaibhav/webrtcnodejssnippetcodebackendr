const meetingServices = require("../services/meeting.service")

exports.startMeeting = (req, res, next) => {
    console.log(req.body);

    const { hostId, hostName } = req.body;

    var model = {
        hostId: hostId,
        hostName: hostName,
        startTime: Date.now(),

    }
    meetingServices.startMeeting(model, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "success",
            data: results.id,

        });
    })
}

exports.checkMeetingExists = (req, res, next) => {
    const { meetingId } = req.query;
    console.log(meetingId);
    meetingServices.checkMeetingExists(meetingId, (error, results) => {
        if (error) {
            return next(error);
        }
        res.status(200).send({
            message: "Success",
            data: results,
        })
    })
}
exports.getAllMeetingUsers = (req, res, next) => {
    const { meetingId } = req.query;
    meetingServices.getAllMeetingUSers(meetingId, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(201).send({
            message: "success",
            data: results
        })
    });
}