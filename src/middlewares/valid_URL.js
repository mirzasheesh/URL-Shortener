const valid = (request, response, next) => {

    const {URL} = request.body;
    
    const urlPattern =  /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

    if(urlPattern.test(URL)){

        next();

    }else{
        
        response.status(400).send(JSON.stringify({
            status: "error",
            message: "URL is not valid"
        }));

        response.end();
    }
}

module.exports = valid;