const { meeting } = require("../models/meeting.model");
const { meetingUser } = require("../models/meeting-user.model");
// const { response } = require("express");

async function getAllMeetingUSers(meetId, callback) {
    meetingUser.find({ meetingId: meetId })
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}


async function startMeeting(params, callback) {
    const meetingSchema = new meeting(params);
    meetingSchema.save()
        .then(async (resposne) => {
            console.log(resposne);
            await meeting.findOneAndUpdate({ id: params.meetingId }, { $addToSet: { "meeting User": meetingSchema } })
            return callback(null, resposne);

        }).catch((error) => {
            return callback(error);
        });
}

async function joinMeeting(params, callback) {
    const meetingUserModel = new meetingUser(params);

    meetingUserModel.save()
        .then(async (resposne) => {
            await meeting.findOneAndUpdate({ id: params.meetingId }, { $addToSet: { "meeting User": meetingUserModel } })
            return callback(null, resposne);

        }).catch((error) => {
            return callback(error);
        });
}

async function isMeetingPresent(meetingId, callback) {
    meeting.findById(meetingId)
        .then((response) => {
            if (!response) {
                callback("iNVALID MEETING ID")
            } else {
                callback(null, true);
            }

        }).catch((error) => {
            return callback(error, false);
        });

}
async function checkMeetingExists(meetingId, callback) {
    meeting.findById(meetingId,).populate("meetingUsers", "MeetingUser")
        .then((response) => {
            console.log(response);
            if (!response) {
                callback("iNVALID MEETING ID")
            } else {
                callback(null, response);
            }

        }).catch((error) => {
            return callback(error, false);
        });

}
async function getMeetingUser(params, callback) {
    const { meetingId, userId } = params;
    meetingUser.find({ meetingId, userId }).then((response) => {
        return callback(null, response[0])
    }).catch((e) => {
        return callback(e);
    });
}

async function updateMeetingUser(params, callback) {
    meetingUser.updateOne({ userId: params.userId }, { $set: params }, { new: true })
        .then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
}
async function getUserBySocketId(params, callback) {
    meetingUser.find({ meetingId, socketId })
        .limit(1)
        .then((response) => {
            return callback(null, respone);
        }).catch((err) => {
            return callback(error);
        })
}
module.exports = {
    startMeeting,
    joinMeeting,
    getAllMeetingUSers,
    isMeetingPresent,
    checkMeetingExists,
    getUserBySocketId,
    updateMeetingUser,
    getMeetingUser
};