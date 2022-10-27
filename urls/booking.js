const express = require("express");
const router = express.Router()
const Booking = require('../models/booking.js')
const Seats = require('../models/seats.js')
const seatPrice = require('../seatPrice.js')
var price;

router.get("/", async(req, res)=> {
    try{
        const seats = await Booking.findOne({phone:req.query.userIdentifier})
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
        price = await seatPrice(seat, req.body.seat_identifier)

        /* New booking object */
        const booking = new Booking({
            seat_id: seat,
            name: req.body.name,
            phone: req.body.phone
        })

        /* Save booking or  */
        try{
            const a1 = await booking.save()
            await Seats.updateOne({seat_identifier:req.body.seat_identifier}, {is_booked: true})
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