

const DeleteData = async (apiEndpoint, payload) => {
    let url = process.env.REACT_APP_API + apiEndpoint;
    
    try {
        return await fetch(url, {
            method: 'DELETE',
            body: `${JSON.stringify(payload)}`,
            headers: {
                // Authorization: accesstoken,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })  
    } catch (err) {
        alert('Error has occured: ' + err);
    }
};

export {
    DeleteData
};