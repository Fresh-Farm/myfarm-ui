
const GetData = async (apiEndpoint) => {
    let url = process.env.REACT_APP_API + apiEndpoint;
    // const accesstoken = await GetAuth();
    try {
        return await fetch(url,
            {
                method: "get",
                headers:
                {
                    // Authorization: accesstoken,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
            .then(response => response.json())
            .then(jsonData => {
                return jsonData;
            })
    } catch (err) {
        alert('Error has occured: ' + err);
    }
};
export  {
    GetData
};
