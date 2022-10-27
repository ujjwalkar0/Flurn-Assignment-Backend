# Flurn-Assignment-Backend

## Problem Statement

A list of seats and the seat class will be provided. Every seat class will have associated pricing with it. Pricing will be in the format of min price, max price and normal price. During the booking process when Seat is selected we should retrieve the pricing for that seat based on the number of bookings that have already happened for that seat class. If the seats in that particular class that was chosen are 60% full, then use the max price for all further seats booked. If the seats in the particular

## APIs to be build

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/8c1a1955a57520ef3056?action=collection%2Fimport)

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

![image](https://user-images.githubusercontent.com/55041104/198143195-5cfa24a4-6bcf-4ada-9dc8-ae50a77de05c.png)

### # Create Booking

POST /booking

Create a booking for the selected seats. Accept an array of seat ids to be booked, name and phone number of the user. Create a booking if those seats are not previously booked. Return relevant error message if any seats chosen are already booked.Upon successful booking, return the booking ID, and the total amount of the booking.

#### Result

* When seat is not booked already.

![image](https://user-images.githubusercontent.com/55041104/198143507-6177342c-7217-41fc-894f-f18a58ce0790.png)


* When seat is booked

![image](https://user-images.githubusercontent.com/55041104/198144179-a86a3ba3-a8b0-4938-a0a9-20824beea169.png)

### # Retrieve Bookings

GET /bookings?userIdentifier=\<email or phone number>

Return all bookings created by the user. The API should search by email or phone number. Any one has to be provided. Return error if no user identifier is provided.


![image](https://user-images.githubusercontent.com/55041104/198203695-74d6aa5d-3a10-42b9-bc49-fffc5ea4868a.png)