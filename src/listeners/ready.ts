import { ApplyOptions } from "@sapphire/decorators";
import { Events, Listener, type ListenerOptions } from "@sapphire/framework";
import { ActivityType } from "discord.js";
import { startCatchers } from "../lib/utils/db";

@ApplyOptions<ListenerOptions>({
  once: true,
  event: Events.ClientReady,
})
export class ReadyListener extends Listener {
  public override async run() {
    this.container.client.user?.setActivity({
      name: "har har har har",
      type: ActivityType.Custom,
    });

    startCatchers(this.container.client);

    this.container.logger.info("Freddy Fazbear has been deployed");
  }
}
