import { Command, Option } from "clipanion";
import { name, version } from "../package.json";

export class StartCommand extends Command {
  public static paths = [Command.Default];

  private port = Option.String("-p,--port", {
    description: "The port to listen on (default: 4000)",
  });

  static usage = Command.Usage({
    description: "Start the server",
    details: "Start the server",
  });

  async execute(): Promise<void> {
    try {
      // const configPathLocation = findConfigFile(this.config as string);
      // const configParsed = parseConfigFile(configPathLocation);
      // this.initLogger(configParsed);
      // const { web } = configParsed;

      // process.title = web?.title || "fargo";


      // await initServer(configParsed, this.port as string, version, name);
      // logger.info("server started");
    } catch (err: any) {
      console.error(err);
      process.exit(1);
    }
  }
}
