const PostData = async (apiEndpoint, payload) => {
    let url = process.env.REACT_APP_API + apiEndpoint;
    // const accesstoken = await GetAuth();
    try {
        return await fetch(url, {
            method: 'POST',
            body: `${JSON.stringify(payload)}`,
            headers: {
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

export {
    PostData
};