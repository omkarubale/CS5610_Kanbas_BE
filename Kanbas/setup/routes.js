import * as dao from "./dao.js";

export default function SetupRoutes(app) {
  app.put("/api/setup/repopulate", async (req, res) => {
    try {
      await dao.repopulateData();
      res.sendStatus(204);
    } catch (e) {
      console.log("ERROR", e);
    }
  });
}
