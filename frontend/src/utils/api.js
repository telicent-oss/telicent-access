import { createApi } from "@telicent-oss/ds";

const bc = new BroadcastChannel("auth-events");

const apiFactory = createApi();
apiFactory.withSessionHandling({
  broadcastChannel: bc,
});

const api = apiFactory.build().instance;
export default api;
