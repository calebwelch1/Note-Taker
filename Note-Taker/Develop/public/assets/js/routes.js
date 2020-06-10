// make routes
express = require("express");
path = require("path");
app = express();
fs = require("fs");
const PORT = 8080;

// make static folder
// brings us to public
app.use(express.static(path.join(__dirname, "..", "..")));
// this makes it so if we use localhost:8080/nameoffile.filetype it brings us there!
// now if we just use /notes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "notes.html"));
});
// GET `*` - Should return the `index.html` file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "index.html"));
});
// listener
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
