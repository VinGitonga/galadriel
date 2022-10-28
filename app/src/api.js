import axios from "axios";
// const VIDEOSDK_TOKEN = process.env.REACT_APP_VIDEOSDK_TOKEN;

export const getToken = async () => {
    const resp = await axios.get(
        "https://5000-vingitonga-galadriel-v4n5vuqh8jk.ws-eu72.gitpod.io/get-token"
    );
    let token = resp.data;
    return token;
};

// export const getToken = () => process.env.REACT_APP_VIDEOSDK_TOKEN;

export const createMeeting = async ({ token }) => {
    const data = { token };

    const resp = await axios.post(
        "https://5000-vingitonga-galadriel-v4n5vuqh8jk.ws-eu72.gitpod.io/create-meeting",
        data
    );

    return resp.data;
};

export const validateMeeting = async ({ meetingId, token }) => {
    let resp = await axios.get(
        `https://5000-vingitonga-galadriel-v4n5vuqh8jk.ws-eu72.gitpod.io/validate-meeting/${token}/${meetingId}`
    );

    return resp.data ? resp.data?.isValidated : false;
};
