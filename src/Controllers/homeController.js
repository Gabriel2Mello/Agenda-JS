exports.homePage = (req, res) => {
    res.render('index');
    return;
}

exports.GetPost = (req, res) => {    
    res.send(req.body);
    return;
}