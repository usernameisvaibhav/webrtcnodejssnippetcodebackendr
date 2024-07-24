const meetingServices = require("../services/meeting.service");
const { MeetingPayloadEnum } = require("../utils/meeting-payload.enum");

async function joinMeeting(meetingId, socket, meetingServer, payload) {
    const { userId, userName } = payload;

    meetingServices.isMeetingPresent(meetingId, async (error, results) => {
        if (error && !results) {
            sendMessage(socket, {
                type: MeetingPayloadEnum.NOT_FOUND
            });
        }
        if (results) {
            // const meeting = await meetingServices.joinMeeting(meetingId, userId, userName);
            addUser(socket, { meetingId, userId, userName }).then((results) => {
                if (results) {
                    sendMessage(socket, {
                        type: MeetingPayloadEnum.JOINED_MEETING,
                        data: {
                            userId: userId,
                        }
                    });
                }
                broadcastUsers(meetingId, socket, meetingServer, {
                    type: MeetingPayloadEnum.USER_JOINED,
                    data: {
                        userId: userId,

                        userName: userName,
                        ...payload.data
                    }


                });






            }, (error) => {
                console.log(error);

            });
        }
    }
    )
};



function forwardConnectionRequest(meetingId, socket, meetingServer, payload) {
    const { userId, otherUserId, name } = payload.data;
    var model = {
        meetingId: meetingId,
        userId: otherUserId,
    }
    meetingServices.getMeetingUser(model, (error, results) => {
        if (results) {
            var sendPayload = {
                type: MeetingPayloadEnum.INCOMING_CONNECTION_REQUEST,
                data: {
                    userId: userId,
                    name: name,
                    ...payload.data
                }
            }

        }
    })
}
function forwardIceCandidate(meetingId, socket, meetingServer, payload) {
    const { userId, otherUserId, candidate } = payload.data;
    var model = {
        meetingId: meetingId,
        userId: otherUserId,
    }
    meetingServices.getMeetingUser(model, (error, results) => {
        if (results) {
            var sendPayload = {
                type: MeetingPayloadEnum.ICE_CANDIDATE,
                data: {
                    userId: userId,
                    name: name,
                    ...payload.data
                }
            }

        }
    })



}



function forwardOfferSDP(meetingId, socket, meetingServer, payload) {
    console.log("not working");
    const { userId, otherUserId, sdp } = payload.data;
    var model = {
        meetingId: meetingId,
        userId: otherUserId,
    }
    meetingServices.getMeetingUser(model, (error, results) => {
        if (results) {
            var sendPayload = {
                type: MeetingPayloadEnum.OFFER_SDP,

                data: {
                    userId: userId,
                    name: name,
                    candidate
                }
            }

        }
    })



}


function forwardAnswerSDP(meetingId, socket, meetingServer, payload) {
    const { userId, otherUserId, sdp } = payload.data;
    var model = {
        meetingId: meetingId,
        userId: otherUserId,
    }
    meetingServices.getMeetingUser(model, (error, results) => {
        if (results) {
            var sendPayload = {
                type: MeetingPayloadEnum.ANSWER_SDP,

                data: {
                    userId: userId,
                    name: name,
                    candidate
                }
            }

        }
    })



}


function userLeft(meetingId, socket, meetingServer, payload) {
    const { userId } = payload.data;

    broadcastUsers(meetingId, socket, meetingServer, {
        type: MeetingPayloadEnum.USER_LEFT,
        data: {
            userId: userId,

        }

    });


}
function endMeeting(meetingId, socket, meetingServer, payload) {
    const { userId } = payload.data;

    broadcastUsers(meetingId, socket, meetingServer, {
        type: MeetingPayloadEnum.MEETING_ENDED,
        data: {
            userId: userId,

        }

    });
    meetingServices.getAllMeetingUSers(meetingId, (error, results) => {
        for (let i = 0; i < results.length; i++) {
            const meetingUser = results[i];

            meetingServer.sockets.connected[meetingUser.socketId].disconnect();



        }

    })



}


function forwardEvent(meetingId, socket, meetingServer, payload) {
    const { userId } = payload.data;

    broadcastUsers(meetingId, socket, meetingServer, {
        type: payload.type,
        data: {
            userId: userId,
            ...payload.data
        }

    });



}
function addUser(socket, { meetingId, userId, name }) {
    let promise = new Promise(function (resolve, reject) {
        meetingServices.getMeetingUser({ meetingId, userId }, (error, results) => {
            if (!results) {
                // reject(error);
                var model = {
                    socketId: socket.id,
                    meetingId: meetingId,
                    userId: userId,
                    name: name,
                    joined: true,
                    isAlive: true,

                };
                meetingServices.joinMeeting(model, (error, results) => {

                    if (results) {
                        resolve(results);
                    }
                    if (error) {
                        reject(error);
                    }
                })

            } else {
                meetingServices.updateMeetingUser({
                    userId: userId,
                    socketId: socket.id,

                }, (error, results) => {
                    if (results) {
                        resolve(true);

                    }
                    if (error) {
                        reject(error);
                    }
                })

            }
            if (results) {
                resolve(results);
            }
        })

    });
    return promise;

}

function sendMessage(socket, payload) {
    socket.send(JSON.stringify(payload))


}

function broadcastUsers(meetingId, socket, meetingServer, payload) {
    socket.broadcast.emit("message", JSON.stringify(payload));

}
module.exports = {
    joinMeeting,
    forwardConnectionRequest,
    forwardIceCandidate,
    forwardOfferSDP,
    forwardAnswerSDP,
    userLeft,
    endMeeting,
    forwardEvent
}

