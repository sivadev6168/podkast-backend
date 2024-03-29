import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/podkast")
  .then(() => {
    console.log("Data Base Connected");
  })
  .catch((e) => {
    console.log(e);
  });

export default mongoose;
