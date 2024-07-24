// // const meetingHelper = require('./utils/meeting-helper');
// // const { MeetingPayloadEnum } = require('./utils/meeting-payload.enum');

// // function parseMessage(message) {
// //     try {
// //         const payload = JSON.parse(message)
// //         return payload;


// //     } catch (error) {
// //         return { type: MeetingPayloadEnum.UNKNOWN }

// //     }
// // }

// // function listenMessage(meetingId, socket, meetingServer) {
// //     console.log("when it will work brooo ");
// //     socket.on('message', (message) => {
// //         console.log("great");
// //         handleMessage(meetingId, socket, message, meetingServer);
// //     });

// // }


// // function handleMessage(meetingId, socket, message, meetingServer) {
// //     console.log(socket);
// //     var payload = "";
// //     if (typeof message === 'string') {
// //         payload = parseMessage(message);
// //     } else {
// //         payload = message;

// //     }
// //     switch (payload.type) {
// //         case MeetingPayloadEnum.JOIN_MEETING:
// //             meetingHelper.joinMeeting(meetingId, socket, meetingServer, payload,)
// //             break;
// //         case MeetingPayloadEnum.CONNECTION_REQUEST:
// //             meetingHelper.forwardConnectionRequest(meetingId, socket, meetingServer, payload)
// //             break;
// //         case MeetingPayloadEnum.OFFER_SDP:
// //             meetingHelper.forwardOfferSDP(meetingId, socket, meetingServer, payload)
// //             break;
// //         case MeetingPayloadEnum.ICE_CANDIDATE:
// //             meetingHelper.forwardIceCandidate(meetingId, socket, meetingServer, payload)
// //             break;
// //         case MeetingPayloadEnum.LEAVE_MEETING:
// //             meetingHelper.userLeft(meetingId, socket, meetingServer, payload)
// //             break;
// //         case MeetingPayloadEnum.END_MEETING:
// //             meetingHelper.endMeeting(meetingId, socket, meetingServer, payload)
// //             break;
// //         case MeetingPayloadEnum.VIDEO_TOGGLE:
// //         case MeetingPayloadEnum.AUDIO_TOGGLE:
// //             meetingHelper.forwardEvent(meetingId, socket, meetingServer, payload)
// //             break;
// //         case MeetingPayloadEnum.UNKNOWN:
// //             break;
// //         default:
// //             break;


// //     }


// // }
// // function initMeetingServer(server) {
// //     const meetingServer = require("socket.io")(server);
// //     meetingServer.on('connection', (socket) => {
// //         // print("greatv2")
// //         console.log("greatv1");
// //         const meetingId = socket.handshake.query.meetingId;
// //         listenMessage(meetingId, socket, meetingServer);
// //     });


// // }
// // module.exports = {
// //     initMeetingServer
// // }

// const meetingHelper = require('./utils/meeting-helper');
// const { MeetingPayloadEnum } = require('./utils/meeting-payload.enum');

// function parseMessage(message) {
//     try {
//         const payload = JSON.parse(message);
//         return payload;
//     } catch (error) {
//         return { type: MeetingPayloadEnum.UNKNOWN };
//     }
// }

// function listenMessage(meetingId, socket, meetingServer) {
//     console.log("Handling message from socket", socket.id);

//     socket.on('message', (message) => {
//         console.log("great")
//         handleMessage(meetingId, socket, message, meetingServer);
//     });
// }

// function handleMessage(meetingId, socket, message, meetingServer) {
//     let payload = "";
//     if (typeof message === 'string') {
//         payload = parseMessage(message); // corrected function name
//     } else {
//         payload = message;
//     }

//     switch (payload.type) {
//         case MeetingPayloadEnum.JOIN_MEETING:
//             meetingHelper.joinMeeting(meetingId, socket, meetingServer, payload);
//             break;
//         case MeetingPayloadEnum.CONNECTION_REQUEST:
//             meetingHelper.forwardConnectionRequest(meetingId, socket, meetingServer, payload);
//             break;
//         case MeetingPayloadEnum.OFFER_SDP:
//             meetingHelper.forwardOfferSDP(meetingId, socket, meetingServer, payload);
//             break;
//         case MeetingPayloadEnum.ICE_CANDIDATE:
//             meetingHelper.forwardIceCandidate(meetingId, socket, meetingServer, payload);
//             break;
//         case MeetingPayloadEnum.LEAVE_MEETING:
//             meetingHelper.userLeft(meetingId, socket, meetingServer, payload);
//             break;
//         case MeetingPayloadEnum.END_MEETING:
//             meetingHelper.endMeeting(meetingId, socket, meetingServer, payload);
//             break;
//         case MeetingPayloadEnum.VIDEO_TOGGLE:
//         case MeetingPayloadEnum.AUDIO_TOGGLE:
//             meetingHelper.forwardEvent(meetingId, socket, meetingServer, payload);
//             break;
//         case MeetingPayloadEnum.UNKNOWN:
//         default:
//             console.log(`Unknown payload type: ${payload.type}`);
//             break;
//     }
// }

// function initMeetingServer(server) {
//     const meetingServer = require('socket.io')(server);
//     meetingServer.on('connection', (socket) => {
//         console.log(socket);
//         console.log("Client connected");
//         console.log("Handling message from socket", socket.id);

//         socket.on('message', (message) => {
//             console.log("great")
//             handleMessage(meetingId, socket, message, meetingServer);
//         });
//         const meetingId = socket.handshake.query.meetingId;
//         listenMessage(meetingId, socket, meetingServer);
//     });
// }

// module.exports = {
//     initMeetingServer
// };

const meetingHelper = require('./utils/meeting-helper');
const { MeetingPayloadEnum } = require('./utils/meeting-payload.enum');

function parseMessage(message) {
    try {
        const payload = JSON.parse(message);
        return payload;
    } catch (error) {
        console.error('Error parsing message:', error);
        return { type: MeetingPayloadEnum.UNKNOWN };
    }
}

function listenMessage(meetingId, socket, meetingServer) {
    console.log(`Setting up message listener for socket ${socket.id} and meeting ID ${meetingId}`);
    socket.on('message', (message) => {
        console.log(`Received message from socket ${socket.id}:`, message);
        handleMessage(meetingId, socket, message, meetingServer);
    });
}

function handleMessage(meetingId, socket, message, meetingServer) {
    console.log(`Handling message from socket ${socket.id}`);
    let payload = "";
    if (typeof message === 'string') {
        payload = parseMessage(message); // Corrected function name
    } else {
        payload = message;
    }

    console.log(`Payload type: ${payload.type}`);

    switch (payload.type) {
        case MeetingPayloadEnum.JOIN_MEETING:
            meetingHelper.joinMeeting(meetingId, socket, meetingServer, payload);
            break;
        case MeetingPayloadEnum.CONNECTION_REQUEST:
            meetingHelper.forwardConnectionRequest(meetingId, socket, meetingServer, payload);
            break;
        case MeetingPayloadEnum.OFFER_SDP:
            meetingHelper.forwardOfferSDP(meetingId, socket, meetingServer, payload);
            break;
        case MeetingPayloadEnum.ICE_CANDIDATE:
            meetingHelper.forwardIceCandidate(meetingId, socket, meetingServer, payload);
            break;
        case MeetingPayloadEnum.LEAVE_MEETING:
            meetingHelper.userLeft(meetingId, socket, meetingServer, payload);
            break;
        case MeetingPayloadEnum.END_MEETING:
            meetingHelper.endMeeting(meetingId, socket, meetingServer, payload);
            break;
        case MeetingPayloadEnum.VIDEO_TOGGLE:
        case MeetingPayloadEnum.AUDIO_TOGGLE:
            meetingHelper.forwardEvent(meetingId, socket, meetingServer, payload);
            break;
        case MeetingPayloadEnum.UNKNOWN:
        default:
            console.log(`Unknown payload type: ${payload.type}`);
            break;
    }
}

function initMeetingServer(server) {
    const meetingServer = require('socket.io')(server);
    meetingServer.on('connection', (socket) => {
        const meetingId = socket.handshake.query.meetingId;
        console.log(`Client connected with socket ID: ${socket.id}`);
        console.log(`Meeting ID from handshake: ${meetingId}`);
        listenMessage(meetingId, socket, meetingServer);
    });
}

module.exports = {
    initMeetingServer
};
