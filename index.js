// start message
console.log("╭───────────────────────────────╮");
console.log("│  Hypixel API Event Websocket  │");
console.log("│                               │");
console.log("│       made by minefled        │");
console.log("╰───────────────────────────────╯");

// modules
const config    = require("./config.json");
const fetch     = require("node-fetch");
const WS        = require("ws");
const gamemodes = {
    Bedwars:       require("./gamemodes/bedwars").bedwars,
    MurderMystery: require("./gamemodes/murder_mystery").murder_mystery,
    Duels:         require("./gamemodes/duels").duels,
    Pit:           require("./gamemodes/pit").pit,
    SkyWars:       require("./gamemodes/skywars").skywars
};

let recent_events = [];
let old_stats = null;

function getApiUri(key, player) {
    return `https://api.hypixel.net/player?key=${key}&uuid=${player}`
}

// init
read();
setInterval(() => {read();}, 1000/config.reads_per_second);

const wss = new WS.Server({ port: config.port });

// main functions
function read() {
    var endpoint = getApiUri(config.API_KEY, config.player_uuid);

    fetch(endpoint)
        .then(response => response.json())
        .then(raw_data => {
            var gms = raw_data.player.stats;
            var stats = {};

            for(var key in gms) {
                if(gamemodes.hasOwnProperty(key)) {
                    var s = new gamemodes[key](gms[key]);
                    stats[key] = s;
                }
            }

            if(old_stats == null) {
                // first request
                old_stats = stats;
                console.log("config:",{"player_uuid": config.player_uuid, "player_name": raw_data.player.displayname,"requestInterval": (1000 / config.reads_per_second).toString()+"ms","reads_per_second": config.reads_per_second});
            }

            // compare
            for(var key in stats) {
                if(stats.hasOwnProperty(key)) {
                    if(old_stats.hasOwnProperty(key)) {
                        var events = stats[key].compare(old_stats[key]);

                        for(var i=0;i<events.length;i++) {postEvent(events[i]);}
                    }
                }
            }

            old_stats = stats;
    });
}

function postEvent(event) {
    // add time information to event
    event.timestamp = new Date().getTime() / 1000;
    event.time = new Date().toTimeString();
    
    // send event via websockets
    wss.broadcast(JSON.stringify({"type":"event","content": event}))

    // log event
    if(config.log_events) {console.log(event);}

    // add event to list of recent events
    recent_events.push(event);
    if(recent_events.length > 50) {recent_events.shift();}
}

// websocket
wss.on('connection', function connection(ws) {
    ws.on('message', function(message) {
        if(message == "getrecent") {
            ws.send(JSON.stringify({"type":"all_recent","content":recent_events}));
        }
    });
});
wss.broadcast = function broadcast(msg) {
    wss.clients.forEach(function each(client) {
        client.send(msg);
     });
};