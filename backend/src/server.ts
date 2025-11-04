import app from "./app";
import { config } from "./config/env";

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
  console.log(`Environment: ${config.NODE_ENV}`);
});
