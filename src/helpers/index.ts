import crypto from "crypto";

const SECRET = "REST_API_SECRET";
export const random = () => crypto.randomBytes(128).toString("base64");
export const auth = (password: string) => {
  return crypto
    .createHmac("sha256", [password].join("/"))
    .update(SECRET)
    .digest("hex");
};
