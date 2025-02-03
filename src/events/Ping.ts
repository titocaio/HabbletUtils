import { sendNotification } from "../utils";
import { Extension, HDirection, HEntity, HEntityType, HEntityUpdate, HMessage, HPacket, HPoint } from 'gnode-api';
import { readFileSync, readdirSync, lstatSync } from 'fs'
import { ExtensionInfo } from 'gnode-api/lib/extension/extensioninfo';

interface SpotInterface {
    name: String;
    tiles: HPoint[];
    attackTile: HPoint;
}

const spots = [
    {name: "baixo", tiles: [new HPoint(52, 28), new HPoint(52, 27)], attackTile: new HPoint(52, 19)},
    {name: "cima", tiles: [new HPoint(52, 18), new HPoint(52, 19)], attackTile: new HPoint(52, 27)}
]

interface userObjectInterface {
    id: number | undefined
    name: String | undefined
    fullId: String | undefined
    genre: "M" | "F" | undefined
    motto: String | undefined
    index?: Number
}

let playing = false;
let playSpot: SpotInterface;
let spotBackInterval;
let Users: HEntity[] = []
let userObject: userObjectInterface = {
    id: undefined,
    name: undefined,
    fullId: undefined,
    genre: undefined,
    motto: undefined
}

const extensionInfo: ExtensionInfo = JSON.parse(readFileSync('./package.json', 'utf8'));
extensionInfo.name = "Habblet Pingpong";

export const ext = new Extension(extensionInfo);

ext.run();


ext.on('connect', async (host, connectionPort, hotelVersion, clientIdentifier, clientType) => {
    ext.interceptByNameOrHash(HDirection.TOSERVER, "Chat", commands)
    ext.interceptByNameOrHash(HDirection.TOSERVER, "GetGuestRoom", getIndex)
    ext.interceptByNameOrHash(HDirection.TOCLIENT, "UserUpdate", detectSpot)
    ext.interceptByNameOrHash(HDirection.TOCLIENT, "Users", users)
    ext.interceptByNameOrHash(HDirection.TOCLIENT, "UserObject", getInfos)
    ext.interceptByNameOrHash(HDirection.TOCLIENT, "ObjectsDataUpdate", (hMessage: HMessage) => {
        const packet = hMessage.getPacket()
    })

    ext.sendToServer(new HPacket(`{out:InfoRetrieve}`));
});

function getIndex(hMessage: HMessage) {
    const myUser = Users.find(user => user.id === userObject.id)
    if (!myUser) return userObject.index = 0
    userObject.index= myUser.index
}

function getInfos (hMessage: HMessage) {
    const packet = hMessage.getPacket();
    const [id, name, fullId, genre, motto ] = packet.read('iSSSSS')
    
    userObject = {
        id,
        name,
        fullId,
        genre,
        motto
    }
}

function users(hMessage: HMessage) {
    const packet = hMessage.getPacket()
    const userParser = HEntity.parse(packet)

    if (userParser.length >= 5) return Users = userParser

    for (const user of userParser) {
        if (user.entityType === HEntityType.HABBO) Users.push(user);
    }
}

async function detectSpot(hMessage: HMessage) {
    const packet = hMessage.getPacket()
    const userUpdate = HEntityUpdate.parse(packet)

    for (const user of userUpdate) {
        if (user.index !== userObject.index && (!playing || !playSpot)) continue;

        if (user.index === userObject.index) {
            handleCurrentUser(user);
        } else {
            handleEnemyUser(user);
        }
    }
}

let losePositionInterval;

function handleCurrentUser(user: HEntityUpdate) {
    const idx = Users.findIndex((usr) => usr.index === userObject.index);
    if (idx === -1) return;

    if (user.movingTo) {
        Users[idx].tile = user.movingTo;
        if (playing && playSpot && isOnTile(user.movingTo, playSpot.tiles[1])) {
            back();
        }
    } else {
        if (!playing) {
            const foundSpot = findSpotByTile(user.tile);
            if (foundSpot) {
                startGame(foundSpot);
            }
        } else {
            if (user.tile.x === 48 && user.tile.y === 19) {
                playing = false;
                clearInterval(spotBackInterval);
                if (!losePositionInterval) {
                    losePositionInterval = setInterval(() => {
                        if (!playing) {
                            ext.sendToServer(new HPacket(`{out:MoveAvatar}{i:49}{i:23}`));
                        } else {
                            clearInterval(losePositionInterval);
                            losePositionInterval = null;
                        }
                    }, 300);
                }
            }
        }
    }
}

function handleEnemyUser(user: HEntityUpdate) {
    if (!playing || !playSpot || !user.movingTo) return;
    if (isOnTile(user.movingTo, playSpot.attackTile)) {
        attack();
    }
}

function startGame(spot: SpotInterface) {
    playSpot = spot;
    playing = true;
    spotBackInterval = setInterval(async () => {
        await delay(38)
        back();
    }, 300);
    attack();
}

function isOnTile(position: HPoint, target: HPoint): boolean {
    return position.x === target.x && position.y === target.y;
}

function findSpotByTile(tile: HPoint): SpotInterface | undefined {
    return spots.find(spot => 
        spot.tiles.some(t => t.x === tile.x && t.y === tile.y)
    );
}

function attack() {
    ext.sendToServer(new HPacket(`{out:MoveAvatar}{i:${playSpot.tiles[1].x}}{i:${playSpot.tiles[1].y}}`))
}

function back() {
    ext.sendToServer(new HPacket(`{out:MoveAvatar}{i:${playSpot.tiles[0].x}}{i:${playSpot.tiles[0].y}}`))
}

function commands(hMessage: HMessage) {
    const packet = hMessage.getPacket()
    const message = packet.readString()

    if (!message.startsWith("!")) return;

    if (message.startsWith("!teste")) {
        attack()
    }
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export const config = {
    direction: HDirection.TOSERVER,
    header: 'Ping',
}