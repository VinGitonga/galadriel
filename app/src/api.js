import axios from "axios";

const baseUrl = "https://galadriel-server.vercel.app"

export const getToken = async () => {
    const resp = await axios.get(
       `${baseUrl}/get-token`
    );
    let token = resp.data;
    return token;
};


export const createMeeting = async ({ token }) => {
    const data = { token };

    const resp = await axios.post(
        `${baseUrl}/create-meeting`,
        data
    );

    return resp.data;
};

export const validateMeeting = async ({ meetingId, token }) => {
    console.log(meetingId)
    console.log(token)
    let resp = await axios.get(
        `${baseUrl}/validate-meeting/${token}/${meetingId}`
    );

    return resp.data ? resp.data?.isValidated : false;
};
