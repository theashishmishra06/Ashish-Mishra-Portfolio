const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {na email
    user: "jashrikrishna10@gmail.com",
    pass: "xpmk utqt ysbw szjj"
  }
});

app.get("/", (req, res) => {
  res.send("Email server running...");
});




app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const mailOptions = {
      from: email,
      to: "jashrikrishna10@gmail.com",
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Message sent to your email successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
