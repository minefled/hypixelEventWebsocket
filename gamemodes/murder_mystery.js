class MurderMysteryStatistics {
    constructor(data) {
        this.coins = data.coins;

        this.games_played = data.games;
        this.wins = data.wins;
        this.losses = data.games - data.wins;
        this.deaths = data.deaths;
        this.kills = data.kills;
        this.was_hero = data.was_hero;
    }

    compare(other) {
        var events = [];

        var coins = this._compare_coins(other);
        var gamesplayed = this._compare_gamesplayed(other);
        var wins = this._compare_wins(other);
        var losses = this._compare_losses(other);
        var deaths = this._compare_deaths(other);
        var kills = this._compare_kills(other);

        for(var e in coins) {events.push(coins[e]);}
        for(var e in gamesplayed) {events.push(gamesplayed[e]);}
        for(var e in wins) {events.push(wins[e]);}
        for(var e in losses) {events.push(losses[e]);}
        for(var e in deaths) {events.push(deaths[e]);}
        for(var e in kills) {events.push(kills[e]);}

        return events;
    }

    _compare_coins(other) {
        var delta = this.coins - other.coins;
        if(delta > 0) {
            return [{
                "event_name":"murdermystery.coins_gained",
                "value": this.coins,
                "delta": delta
            }];
        };
        return [];
    }
    _compare_gamesplayed(other) {
        var delta = this.games_played - other.games_played;
        if(delta > 0) {
            return [{
                "event_name":"murdermystery.game_played",
                "value": this.games_played,
                "delta": delta
            }];
        };
        return [];
    }
    _compare_wins(other) {
        var delta = this.wins - other.wins;
        if(delta > 0) {
            return [{
                "event_name":"murdermystery.win",
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
                "event_name":"murdermystery.loss",
                "value": this.losses,
                "delta": delta
            }];
        }
        return []
    }
    _compare_deaths(other) {
        var delta = this.deaths - other.deaths;
        if(delta > 0) {
            return [{
                "event_name":"murdermystery.death",
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
                "event_name":"murdermystery.kill",
                "value": this.kills,
                "delta": delta
            }];
        }
        return [];
    }
    _compare_wasHero(other) {
        var delta = this.was_hero - other.was_hero;
        if(delta > 0) {
            return [{
                "event_name":"murdermystery.was_hero",
                "value": this.kills,
                "delta": delta
            }];
        }
        return [];
    }
}

exports.murder_mystery = MurderMysteryStatistics;