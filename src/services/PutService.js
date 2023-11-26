const PutService = async (apiEndpoint, payload) => {
    let url = process.env.REACT_APP_API + apiEndpoint;
    // const accesstoken = await GetAuth();
    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: `${JSON.stringify(payload)}`,
            headers: {
                // Authorization: accesstoken,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });        
        return response;
    } catch (err) {
        alert('Error has occured: ' + err);
    }
};

export {
    PutService
};