// make routes
express = require("express");
path = require("path");
app = express();
fs = require("fs");
const PORT = process.env.PORT || 8080;

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
//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
  const readNotes = fs.readFile(
    path.join(__dirname, "..", "..", "db", "db.json"),
    "utf8",
    (err, data) => {
      if (err) {
        throw err;
      }
      console.log(data);
    }
  );
  // not sure if this is how you send it or not
  res.json(readNotes);
  // res.sendFile(path.join(__dirname, "..", "..", "..", "db", "db.json"));
});

//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", (req, res) => {
  fs.appendFile(
    path.join(__dirname, "..", "..", "db", "db.json"),
    req.body,
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
});
//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
