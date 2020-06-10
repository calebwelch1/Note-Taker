// make routes
express = require("express");
path = require("path");
app = express();
const PORT = 8080;

app;
// GET `/notes` - Should return the `notes.html` file.
app.get("/notes.html", (req, res) => {
  res.sendFile(path.join(__dirname, "assets"));
});
// GET `*` - Should return the `index.html` file

// listener
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
