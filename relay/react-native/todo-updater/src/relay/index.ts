import { RecordSource, Store, Environment } from "react-relay-offline";

import { Network, FetchFunction } from "relay-runtime";
export { QueryRenderer, graphql } from "react-relay-offline";
import RelayNetworkLogger from "relay-runtime/lib/RelayNetworkLogger";

/**
 * Define fetch query
 */
const fetchQuery: FetchFunction = (operation, variables) => {
  const localIP = "192.168.1.105";
  console.log("fetch", localIP, operation);
  return fetch("http://" + localIP + ":3000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(response => {
    return response.json();
  });
};

/**
 * Network
 */
const network = Network.create(
  RelayNetworkLogger.wrapFetch(fetchQuery, () => "")
);
export default network;

const offlineOptions = {
  manualExecution: false, //optional
  network: network, //optional
  onComplete: (options: any) => {
    //optional
    const { id, offlinePayload, snapshot } = options;
    console.log("onComplete", options);
    return true;
  },
  onDiscard: (options: any) => {
    //optio
    const { id, offlinePayload, error } = options;
    console.log("onDiscard", options);
    return true;
  }
};

/**
 * Store
 */
const options: any = {
  errorHandling: (cache: any, error: any) => console.log("error storage", error)
};

export const recourdSource = new RecordSource(options);

export const store = new Store(recourdSource, options);

/**
 * Environment
 */
export const environment = new Environment({ network, store }, offlineOptions);
