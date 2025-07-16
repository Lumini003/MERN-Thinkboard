import ratelimit from '../config/upstash.js';


const rateLimiter= async (req, res, next) => {

    try{
        const {success} = await ratelimit.limit("my-limit-key")

        if (!success) {
            return res.status(429).json({message: "Too many requests, please try again later."})
        }

        next(); // If the request is within the limit, proceed to the next middleware or route handler

    } catch (error) {

        console.log("rate limit error", error); // Log the error for debugging
        next(error); // Pass the error to the next middleware for handling

    }

}

export default rateLimiter;