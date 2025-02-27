const MeetingPayloadEnum = {
    JOIN_MEETING: 'join-meeting',
    JOINED_MEETING: 'joined-meeting',
    USER_JOINED: 'user-joined',
    CONNECTION_REQUEST: 'connection-request',
    INCOMING_CONNECTION_REQUEST: 'connection-setting-changed',
    OFFER_SDP: 'offer-sdp',
    ANSWER_SDP: 'answer-sdp',
    LEAVE_MEETING: 'leave-meeting',
    END_MEETING: 'end-meeting',
    USER_LEFT: 'user-left',
    MEETING_ENDED: 'meeting-ended',
    ICE_CANDIDATE: 'icecandidate',
    VIDEO_TOGGLE: 'video-toggle',
    AUDIO_TOGGLE: 'audio-toggle',
    NOT_FOUND: 'not-found',
    UNKNOWN: 'unknown'
}

module.exports = { MeetingPayloadEnum };