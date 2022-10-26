const express = require("express");
const router = express.Router()
const Booking = require('../models/booking.js')
const Seats = require('../models/seats.js')

router.get("/", async(req, res)=> {
    try{
        const seats = await Booking.find({phone:req.query.userIdentifier})
        console.log(req.query.userIdentifier, seats)
        res.json(seats)
    }
    catch(err){
        console.log(err)
    }
})

router.post("/", async(req, res) => {
    const seat = await Seats.findOne({seat_identifier:req.body.seat_identifier})
    console.log(seat.seat_class)

    /* Check if seat is already booked or not ? */
    if (!seat.is_booked) {        

        /* Percentage of seat booked. */
        const class_of = await Seats.find({seat_class:seat.seat_class})
        const booked_by_class = await Seats.find({seat_identifier:req.body.seat_identifier, class:seat.seat_class})
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
        console.log(price)

        /* New booking object */
        const booking = new Booking({
            seat_id: seat,
            name: req.body.name,
            phone: req.body.phone
        })

        /* Save booking or  */
        try{
            const a1 = await booking.save()
            await Seats.updateOne({seat_identifier:req.body.seat_identifier}, {isBooked: true})
            res.json({"booking_id":a1._id, "price":price})
        }
        catch(err){
            console.log(err)
            res.send(err)
        }
    }
    else{
        res.send({"message":"ticket already booked"})
    }
})
  
module.exports = router