class BedwarsStatistics {

    constructor(data) {
        this.xp = data.Experience;
        this.coins = data.coins;

        this.games_played = data.games_played_bedwars;
        this.deaths = data.deaths_bedwars;
        this.kills = data.kills_bedwars;
        this.beds_lost = data.beds_lost_bedwars;

        this.wins = data.wins_bedwars;
        this.losses = data.losses_bedwars;
    }

    compare(other) {
        var events = [];

        var xp = this._compare_xp(other);
        var coins = this._compare_coins(other);
        var games_played = this._compare_games_played(other);
        var deaths = this._compare_deaths(other);
        var kills = this._compare_kills(other);
        var beds_lost = this._compare_beds_lost(other);
        var wins = this._compare_wins(other);
        var losses = this._compare_losses(other);

        for(var e in xp) {events.push(xp[e]);}
        for(var e in coins) {events.push(coins[e]);}
        for(var e in games_played) {events.push(games_played[e]);}
        for(var e in deaths) {events.push(deaths[e]);}
        for(var e in kills) {events.push(kills[e]);}
        for(var e in beds_lost) {events.push(beds_lost[e]);}
        for(var e in wins) {events.push(wins[e]);}
        for(var e in losses) {events.push(losses[e]);}

        return events;
    }

    _compare_xp(other) {
        var delta = this.xp - other.xp;
        if(delta > 0) {
            return [{
                "event_name":"bedwars.xp_gained",
                "value": this.xp,
                "delta": delta
            }];
        }
        return [];
    }
    _compare_coins(other) {
        var delta = this.coins - other.coins;
        if(delta > 0) {
            return [{
                "event_name":"bedwars.coins_gained",
                "value": this.coins,
                "delta": delta
            }];
        }
        return [];
    }
    _compare_games_played(other) {
        var delta = this.games_played - other.games_played;
        if(delta > 0) {
            return [{
                "event_name":"bedwars.game_played",
                "value": this.games_played,
                "delta": delta
            }];
        }
        return [];
    }
    _compare_deaths(other) {
        var delta = this.deaths - other.deaths;
        if(delta > 0) {
            return [{
                "event_name":"bedwars.death",
                "value": this.deaths,
                "delta": delta
            }];
        }
        return [];
    }
    _compare_kills(other) {
        var delta = this.kills - other.kills;
        if(delta > 0) {
            return [{
                "event_name":"bedwars.kill",
                "value": this.kills,
                "delta": delta
            }];
        }
        return [];
    }
    _compare_beds_lost(other) {
        var delta = this.beds_lost - other.beds_lost;
        if(delta > 0) {
            return [{
                "event_name":"bedwars.bed_lost",
                "value": this.beds_lost,
                "delta": delta
            }];
        }
        return [];
    }
    _compare_wins(other) {
        var delta = this.wins - other.wins;
        if(delta > 0) {
            return [{
                "event_name":"bedwars.win",
                "value": this.wins,
                "delta": delta
            }];
        }
        return [];
    }
    _compare_losses(other) {
        var delta = this.losses - other.losses;
        if(delta > 0) {
            return [{
                "event_name":"bedwars.loss",
                "value": this.xp,
                "delta": delta
            }];
        }
        return [];
    }
}

exports.bedwars = BedwarsStatistics;