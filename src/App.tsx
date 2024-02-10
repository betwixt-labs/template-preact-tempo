import { Component, h } from "preact";
import { TempoChannel } from "@tempojs/client";
import { GreeterClient, HelloResponse, IHelloResponse } from "./services.gen";

interface LogViewerState {
  logs: (IHelloResponse | string)[];
}

const clientGenerator = async function* gen() {
  yield { name: "A" };
  yield { name: "B" };
  yield { name: "C" };
};

class LogViewer extends Component<{}, LogViewerState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      logs: [],
    };
  }

  async componentDidMount() {
    const serviceAddress = "https://tempo-server-production.up.railway.app";
    const channel = TempoChannel.forAddress(serviceAddress);
    const client = channel.getClient(GreeterClient);
    this.addLog("----- Connecting to Tempo server... -----");
    this.addLog("Service address: ", serviceAddress);
    this.addLog("User-Agent: ", (channel as any).userAgent);
    this.addLog("\n\n----- Client is ready and sending unary request... -----");

    // Send a unary request
    const unaryResponse = await client.sayHello({ name: "World" });
    this.addLog("Unary response: ", unaryResponse, "\n\n");

    this.addLog("----- Sending client stream... -----");
    let canClientStream = true;
    try {
      // Send a client stream and print the response
      const clientStreamResponse = await client.sayHelloClient(clientGenerator);
      this.addLog("Client stream response: ", clientStreamResponse, "\n\n");
    } catch {
      this.addLog("[ERROR] client streaming not supported by browser");
      canClientStream = false;
    }

    this.addLog("----- Receiving server stream... -----");
    // Receive a server stream and update the logs state
    for await (const payload of await client.sayHelloServer({
      name: "World",
    })) {
      this.addLog("Server stream payload:", payload);
    }

    this.addLog("\n\nServer stream complete\n\n");

    if (canClientStream) {
      this.addLog("----- Sending duplex stream... -----");
      // Send and receive a duplex stream, printing each payload
      for await (const payload of await client.sayHelloDuplex(
        clientGenerator
      )) {
        this.addLog("Duplex stream payload: ", payload);
      }
      this.addLog("\n\nDuplex stream complete");
    } else {
      this.addLog(
        "[INFO] skipping duplex stream because client streaming is not supported by browser"
      );
    }
  }

  addLog(...args: (IHelloResponse | string)[]) {
    const logMessage = args
      .map((arg) => {
        if (typeof arg === "string") {
          return arg;
        } else {
          return HelloResponse.encodeToJSON(arg);
        }
      })
      .join(" ");

    this.setState((prevState) => ({
      logs: [...prevState.logs, logMessage],
    }));
  }

  render() {
    const { logs } = this.state;
    return (
      <div className="log-container">
        {logs.map((log, index) => (
          <div
            className={`log-row ${index % 2 === 0 ? "even" : "odd"}`}
            key={index}
          >
            <pre key={index}>{log}</pre>
          </div>
        ))}
      </div>
    );
  }
}

export default LogViewer;
