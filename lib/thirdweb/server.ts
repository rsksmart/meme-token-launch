import { createThirdwebClient } from "thirdweb";

const secretKey = process.env.THIRDWEB_SECRET_KEY;

if (!secretKey) {
  throw new Error("THIRDWEB_SECRET_KEY is not set");
}

export const serverClient = createThirdwebClient({ secretKey });
