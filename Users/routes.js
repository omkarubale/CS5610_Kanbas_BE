import * as dao from "./dao.js";

export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    try {
      const user = await dao.createUser(req.body);
      res.json(user);
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  const deleteUser = async (req, res) => {
    try {
      const status = await dao.deleteUser(req.params.userId);
      res.json(status);
    } catch (e) {
      console.log("ERROR", e);
    }
  };
  const findAllUsers = async (req, res) => {
    try {
      const { role } = req.query;
      if (role) {
        const users = await dao.findUsersByRole(role);
        res.json(users);
        return;
      }

      const users = await dao.findAllUsers();
      res.json(users);
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  const findUserById = async (req, res) => {
    try {
      const user = await dao.findUserById(req.params.userId);
      res.json(user);
    } catch (e) {
      console.log("ERROR", e);
    }
  };
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    try {
      delete req.body._id;
      const status = await dao.updateUser(userId, req.body);
      currentUser = await dao.findUserById(userId);
      res.json(status);
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  const signup = async (req, res) => {
    try {
      const user = await dao.findUserByUsername(req.body.username);
      if (user) {
        res.status(400).json({ message: "Username already taken" });
      }
      const currentUser = await dao.createUser(req.body);
      console.log("saved to session: ", currentUser);
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  const signin = async (req, res) => {
    console.log("Signin: ", req.body);
    try {
      const { username, password } = req.body;
      const currentUser = await dao.findUserByCredentials(username, password);
      if (currentUser) {
        console.log("saved to session: ", currentUser);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
      } else {
        res.sendStatus(401);
      }
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = async (req, res) => {
    console.log("Profile: ", req.body);
    try {
      const currentUser = req.session["currentUser"];
      console.log("fetched session: ", currentUser);
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      res.json(currentUser);
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}
