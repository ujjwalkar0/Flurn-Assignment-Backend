# Flurn-Assignment-Backend

## Problem Statement

A list of seats and the seat class will be provided. Every seat class will have associated pricing with it. Pricing will be in the format of min price, max price and normal price. During the booking process when Seat is selected we should retrieve the pricing for that seat based on the number of bookings that have already happened for that seat class. If the seats in that particular class that was chosen are 60% full, then use the max price for all further seats booked. If the seats in the particular

## APIs to be build

### # Get All Seats

GET /seats
Return all the seats, ordered by the seat class and also return a boolean is_booked for every seat.

### Result:

![image](https://user-images.githubusercontent.com/55041104/198136839-ddf770bc-c26d-45e6-a209-33888c0806d4.png)

### # Get Seat pricing

GET /seats/id
Return the seat details along with the pricing for the seat based on the class.

Note: The pricing should be returned based on the bookings previously made for that seat class.

    ● Less than 40% of seats booked - use the min_price, if min_price is not available, use normal_price

    ● 40% - 60% of seats booked - use the normal_price, if normal_price not available, use max_price

    ● More than 60% of seats booked - use the max_price, if max_price is not available, use normal_price

#### Result:

![image](https://user-images.githubusercontent.com/55041104/198137277-43d777bc-9f1e-4e15-852d-964e6431b043.png)
