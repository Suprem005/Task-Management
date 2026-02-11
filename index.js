import express from "express";
import connectDB from "./modules/services/db.connect.js";
import userRoutes from "./user/user.controller.js";

const app = express();

// to make app understand json
app.use(express.json());

// TODO: enable CORS

// connect DB
await connectDB();
//  register routes
app.use(userRoutes);

// TODO: handle global errors

// network port and server

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});
