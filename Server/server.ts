import { app } from "./app";
require("dotenv").config();

//Tạo server
app.listen(process.env.PORT, () => {
  console.log(`May chu ket noi voi port ${process.env.PORT}`);
});
