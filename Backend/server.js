const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/Db.js");
const cors = require("cors");
const authRoutes= require('./Routes/authRoutes.js')
const { createDefaultAdmin } = require("./Controllers/authController.js");
dotenv.config();

connectDB();
const app = express();
const allowedOrigins = [
  "http://localhost:8080", // Local frontend (for development)
  "https://doit-prebooking-test.vercel.app",
   // Production frontend
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Allow cookies if needed
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',function(req,res){
  res.send("hey")
});

app.use('/api/auth',authRoutes)

app.listen(process.env.PORT || 5000,async () => {
  console.log(`server is running on ${process.env.PORT}`);
  await createDefaultAdmin()
});




// const express = require("express");
// const dotenv = require("dotenv");
// const connectDB = require("./Config/Db.js");
// const cors = require("cors");
// const path = require("path");
// const fs = require("fs");

// const authRoutes = require("./Routes/authRoutes.js");
// const { createDefaultAdmin } = require("./Controllers/authController.js");

// dotenv.config();
// connectDB();

// const app = express();
// const allowedOrigins = [
//   "http://localhost:8080", // Local frontend (for development)
//   "https://doit-prebooking-test.vercel.app", // Production frontend
// ];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true, // Allow cookies if needed
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ✅ Serve Vite build files in production
// const isProduction = process.env.NODE_ENV === "production";
// if (isProduction) {
//   const distPath = path.resolve(__dirname, "dist");
//   const manifestPath = path.join(distPath, ".vite", "manifest.json");

//   app.use(express.static(distPath));

//   if (fs.existsSync(manifestPath)) {
//     const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

//     // Helper function to get asset paths
//     const getAsset = (file) =>
//       manifest[file]?.file ? `/${manifest[file].file}` : `/${file}`;

//     app.get("*", (req, res) => {
//       res.send(`
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Vite + Express</title>
//           <link rel="stylesheet" href="${getAsset("src/main.css")}" />
//         </head>
//         <body>
//           <div id="root"></div>
//           <script type="module" src="${getAsset("src/main.tsx")}"></script>
//         </body>
//         </html>
//       `);
//     });
//   }
// } else {
//   app.get("/", (req, res) => {
//     res.send("Hey, this is the Express backend.");
//   });
// }

// // ✅ Authentication Routes
// app.use("/api/auth", authRoutes);

// // ✅ Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, async () => {
//   console.log(`Server is running on ${PORT}`);
//   await createDefaultAdmin();
// });
