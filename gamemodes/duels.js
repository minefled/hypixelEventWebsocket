class DuelsStatistics {
    constructor(data) {
        this.coins = data.coins;

        this.games_played = data.games_played_duels;
        this.deaths = data.deaths;
        this.kills = data.kills;
        this.losses = data.losses;
        this.wins = data.wins;
    }

    compare(other) {
        var events = [];

        var coins = this._compare_coins(other);
        var games_played = this._compare_gamesplayed(other);
        var deaths = this._compare_deaths(other);
        var kills = this._compare_kills(other);
        var losses = this._compare_losses(other);
        var wins = this._compare_wins(other);

        for(var e in coins) {events.push( coins[e] );}
        for(var e in games_played) {events.push( games_played[e] );}
        for(var e in deaths) {events.push( deaths[e] );}
        for(var e in kills) {events.push( kills[e] );}
        for(var e in losses) {events.push( losses[e] );}
        for(var e in wins) {events.push( wins[e] );}

        return events;
    }

    _compare_coins(other) {
        var delta = this.coins - other.coins;
        if(delta > 0) {
            return [{
                "event_name":"duels.coins_gained",
                "value": this.coins,
                "delta": delta
            }];
        }
        return [];
    }
    _compare_gamesplayed(other) {
        var delta = this.games_played - other.games_played;
        if(delta > 0) {
            return [{
                "event_name":"duels.game_played",
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
                "event_name":"duels.death",
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
                "event_name":"duels.kill",
                "value": this.kills,
                "delta": delta
            }];
        }
        return [];
    }
    _compare_losses(other) {
        var delta = this.losses - other.losses;
        if(delta > 0) {
            return [{
                "event_name":"duels.loss",
                "value": this.losses,
                "delta": delta
            }];
        }
        return [];
    }
    _compare_wins(other) {
        var delta = this.wins - other.wins;
        if(delta > 0) {
            return [{
                "event_name":"duels.win",
                "value": this.deaths,
                "delta": delta
            }];
        }
        return [];
    }
}

exports.duels = DuelsStatistics;