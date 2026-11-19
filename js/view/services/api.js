const myApi = axios.create({
    baseURL: "https://seriescope-api.vercel.app/api/series",
    timeout: 8000,
    headers: {
        "X-Learner": "a.amimi"
    }
});

export default myApi;