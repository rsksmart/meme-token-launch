import { createThirdwebClient } from "thirdweb";

// Get client ID from environment with fallback for build time
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "808ef602aef974e736abd8fad959babb";

export const client = createThirdwebClient({ 
  clientId
});
