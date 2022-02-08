function paramsvalidator(req, res, Validateparams, next) {
    if (req.method === 'GET') {
        let responseStatus = true;
        let missingFields = [];
        let missingValues = [];
        let keys = [];

        for (var k in req.params) keys.push(k);
        Validateparams.forEach(element => {
            if (keys.indexOf(element) === -1) {
                missingFields.push(element);
                responseStatus = false;
            }
        });

        keys.forEach(element => {
            if (Validateparams.indexOf(element) !== -1) {
                if (req.params[element] === "" || req.params[element] === undefined || req.params[element].length === 0) {
                    missingValues.push(element)
                    responseStatus = false;
                }
            }
        });
        if (!responseStatus) {
            let error = "Parameters missing : " + missingFields + ", Values missing for :" + missingValues;
            return res.status(400).send({
                status: false,
                error: error
            });
        }

        return next();
    } else if (req.method === 'POST') {
        let responseStatus = true;
        let missingFields = [];
        let missingValues = [];
        let keys = [];

        for (var k in req.body) keys.push(k);
        Validateparams.forEach(element => {
            if (keys.indexOf(element) === -1) {
                missingFields.push(element);
                responseStatus = false;
            }
        });
        keys.forEach(element => {
            if (Validateparams.indexOf(element) !== -1) {
                if (req.body[element] === "" || req.body[element] === undefined || req.body[element].length === 0) {
                    missingValues.push(element)
                    responseStatus = false;
                }
            }
        });
        if (!responseStatus) {
            let error = "Parameters missing : " + missingFields + ", Values missing for :" + missingValues;
            res.status(400).send({
                status: false,
                error: error
            });
            return;
        }
        return next();
    }

}

exports.paramsvalidator = paramsvalidator;