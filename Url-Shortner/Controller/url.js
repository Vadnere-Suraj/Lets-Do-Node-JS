const URL = require('../Models/url');
const ids = require('short-id');




async function handleCreateShortId(req, res) {
    const bod = req.body;

    if (!bod.url) {
        return res.status(400).json({ message: "Please enter a valid URL" })
    }

    const shortid = ids.generate()
    console.log(shortid);

    await URL.create({
        redirectURl: bod.url,
        shortID: shortid,
        visitHistory: []
    })


    return res.status(201).json({ message: `URL enterd successfully ${shortid}` })
}

async function handleRedirect(req, res) {
    const shortid = req.params.shortid;
    console.log(shortid);

    const entry = await URL.findOneAndUpdate({shortID : shortid}, {$push : {
        visitHistory : {
            timeS : Date.now()
        }
    }})

    console.log(entry)
    
   console.log(entry.redirectURl)

   res.redirect(entry.redirectURl)
}


async function handleAnalytics(req, res){
    const shortid = req.params.shortid;

    const entry = await URL.findOne({shortID : shortid});

    return res.status(201).json({
        clicks : entry.visitHistory.length,
        analytics : entry.visitHistory,
    })
   
}


module.exports = { handleCreateShortId, handleRedirect, handleAnalytics };