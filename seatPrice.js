const Seats = require('./models/seats')

module.exports = seatPrice = async (seat, seat_identifier) => {
    /* Percentage of seat booked. */
    const class_of = await Seats.find({seat_class:seat.seat_class})
    const booked_by_class = await Seats.find({seat_identifier:seat_identifier, class:seat.seat_class})
    const percentage = (booked_by_class.length/class_of.length)*100
    var price = 0

    /* Get price value according to percentage */
    if (percentage<40){
        if (seat.min_price!="NaN"){
            price = seat.min_price
        }
        else{
            price = seat.normal_price
        }
    }
    else if (percentage>40 && percentage<60){
        if (seat.normal_price!="NaN"){
            price = seat.normal_price
        }
        else{
            price = seat.max_price
        }
    }
    else{
        if (seat.max_price!="NaN"){
            price = seat.max_price
        }
        else{
            price = seat.normal_price
        }
    }
    return price   
}