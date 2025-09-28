import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "ddhfnzrub",       // Found in the Cloudinary dashboard
  api_key: "214464574197858",             // Found in the Cloudinary dashboard
  api_secret: "EhYLoZud1hO1OgnwD4zAAKIA_ME",       // Found in the Cloudinary dashboard
});

export default cloudinary;
