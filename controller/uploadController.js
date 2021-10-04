const router = require("express").Router();
const upload = require("./upload");
const gfs = require("../server");



router.post("/uploadImage", upload.single("file"), async (req, res) => {

    console.log("function call weyan", req.file)

    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `https://rent-x-api.herokuapp.com/file/${req.file.filename}`;
    return res.send(imgUrl);
});



router.get("/file/:filename", async (req, res) => {
    console.log("get file ");
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.send("not found");
    }
});



module.exports = router;