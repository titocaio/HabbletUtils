import { HDirection, HPacket } from "gnode-api";
import { ext } from "..";

export function sendNotification(text: string) {
    let notificationPacket = new HPacket('NotificationDialog', HDirection.TOCLIENT)
    .appendString("")
    .appendInt(3)
    .appendString("display")
    .appendString("BUBBLE")
    .appendString("message")
    .appendString(text, 'utf-8')
    .appendString("image")
    .appendString("https://raw.githubusercontent.com/sirjonasxx/G-ExtensionStore/repo/1.5.1/store/extensions/ListeningMotto/icon.png")

  ext.sendToClient(notificationPacket);
}