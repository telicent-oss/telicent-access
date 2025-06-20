import { createApi, getChannel } from '@telicent-oss/ds';

const apiFactory = createApi();

apiFactory.withSessionHandling({
  broadcastChannel: getChannel(),
  keysToInvalidate: [],
  queryClient: null, // for react query
});

const api = apiFactory.build().instance;
export default api;