class trip {
    constructor(trip) {
        this.startTime = trip.st;
        this.endTime = trip.et;
        this.startStation = stations.find ( s => s.id === trip.start_station_id );
        this.endStation = station.find ( s => s.id === trip.end_station_id );
    }

    display(time) {
        noStroke();
        fill(0, 0, 255);
        if (time > this.startTime && time < this.endTime) {
            const progress = map(Time, this.startTime, this.endTime, 0, 1);
            this.x = lerp(this.startStation.x, this.endStation.x, progress);
            this.y = lerp(this.startStation.y, this.endStation.y, progress);

            noStroke();
            fill(0, 0, 255);
            circle(this.x, this.y, 5);
        }
    }
}