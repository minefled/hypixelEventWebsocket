class PitStatistics {
    constructor(data) {
        this.joins       = data.pit_stats_ptl.joins;
        this.kills       = data.pit_stats_ptl.kills;
        this.deaths      = data.pit_stats_ptl.deaths;
        this.cash_earned = data.pit_stats_ptl.cash_earned;
    }

    compare(other) {
        var events = [];

        var joins = this._compare_joins(other);
        var kills = this._compare_kills(other);
        var deaths = this._compare_deaths(other);
        var cash_earned = this._compare_cashearned(other);

        for(var e in joins) {events.push( joins[e] );}
        for(var e in kills) {events.push( kills[e] );}
        for(var e in deaths) {events.push( deaths[e] );}
        for(var e in cash_earned) {events.push( cash_earned[e] );}

        return events;
    }

    _compare_joins(other) {
        var delta = this.joins - other.joins;
        if(delta > 0) {
            return [{
                "event_name": "pit.join",
                "value": this.joins,
                "delta": delta
            }];
        }
        return [];
    }
    _compare_kills(other) {
        var delta = this.kills - other.kills;
        if(delta > 0) {
            return [{
                "event_name": "pit.kill",
                "value": this.kills,
                "delta": delta
            }];
        }
        return [];
    }
    _compare_deaths(other) {
        var delta = this.deaths - other.deaths;
        if(delta > 0) {
            return [{
                "event_name": "pit.death",
                "value": this.joins,
                "delta": delta
            }];
        }
        return [];
    }
    _compare_cashearned(other) {
        var delta = this.cash_earned - other.cash_earned;
        if(delta > 0) {
            return [{
                "event_name": "pit.cash_earned",
                "value": this.cash_earned,
                "delta": delta
            }];
        }
        return [];
    }
}

exports.pit = PitStatistics;