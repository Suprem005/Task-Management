import mongoose from "mongoose";

const checkMongoIdValidityFromBody = (id) => mongoose.isValidObjectId(id);

export default checkMongoIdValidityFromBody;
