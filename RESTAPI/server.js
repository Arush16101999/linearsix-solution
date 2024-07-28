const { google } = require("googleapis");
const express = require("express");
const fs = require("fs");
const path = require("path");

const CREDENTIALS_PATH = path.join(__dirname, "credentials.json");
const TOKEN_PATH = path.join(__dirname, "token.json");

let credentials;
try {
  credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
} catch (error) {
  console.error("Error loading client secret file:", error);
  process.exit(1);
}

const app = express();

app.get("/freebusy", async (req, res) => {
  const { calendarId, timeMin, timeMax } = req.query;

  if (!calendarId || !timeMin || !timeMax) {
    return res
      .status(400)
      .send("Missing required query parameters: calendarId, timeMin, timeMax");
  }

  try {
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        items: [{ id: calendarId }],
      },
    });
    const busyIntervals = response.data.calendars[calendarId].busy;
    res.json(busyIntervals);
  } catch (error) {
    console.error("Error fetching free/busy intervals:", error);
    res.status(500).send("Error fetching free/busy intervals");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
