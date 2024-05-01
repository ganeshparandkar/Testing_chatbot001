const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();

const PORT = 8000;

//middleware - Plugin
app.use(express.urlencoded({ extended: false }));
app.post("/",(req,res)=>{
  console.log(req)
  return res.send("Hello World")
})

//Routes
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    // Edit the user using ID
    const id = Number(req.params.id);
    const body = req.body;

    let indexToUpdate = users.findIndex((user) => user.id === id);
    if (indexToUpdate !== -1) {
      users[indexToUpdate] = { ...body, id: id};
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
          return res.status(500).json({ error: "Failed to update user" });
        }
        return res.json({ status: "success", id: id });
      });
    return res.status(200)
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  })
  .delete((req, res) => {
    const id = Number(req.params.id);

    const indexToDelete = users.findIndex((user) => user.id === id);

    if (indexToDelete !== -1) {
        users.splice(indexToDelete, 1); // Remove 1 element at the found index
        // Write the updated data to the JSON file
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to delete user" });
            }
            return res.json({ status: "success", id: id });
        });
    } else {
        return res.status(404).json({ error: "User not found" });
    }
  });

app.post("/api/users", (req, res) => {
  // create user
  const body = req.body;
//   console.log(body)
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

// !-------------------------------------------------
// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
//   });

// app.patch("/api/users/:id", (req, res) => {
//   //edit the user using ID
//   return res.json({ status: "pending" });
// });
// app.delete("/api/users/:id", (req, res) => {
//   //delete the user using ID
//   return res.json({ status: "pending" });
// });

// !-------------------------------------------------

// server side rendering

app.get("/users", (req, res) => {
  const html = `
    <ul> 
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  return res.send(html);
});

app.listen(PORT, () => console.log(`server started at port: ${PORT}`));
