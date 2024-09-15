import mongoose from "mongoose";

const modificationPkgSchema = new mongoose.Schema(
  {
    pkgID: {
      type: String,
    },
    pkgName: {
      type: String,
    },
    pkgDes: {
      type: String,
    },
    imageURL: {
      type: String,
    },
    pkgPrice: {
      type: Number,
    },
    pkgServ: [
      {
        key: String,
        name: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ModificationPkgModel", modificationPkgSchema);
