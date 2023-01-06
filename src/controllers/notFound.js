const notFound = async (request, response) => {

    const resp = JSON.stringify({
        status: "error",
        message: "the requested resource not found"
    });
    
    response.status(404).send(resp);
    
    response.end();
};

module.exports = notFound;