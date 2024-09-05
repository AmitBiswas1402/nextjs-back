import {connect} from '@/db/dbConfig'
import User from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const {email, password} = reqBody
        
        console.log(reqBody);

        // check if user exits
        const user = await User.findOne({email})

        if (!user) {
            return NextResponse.json({error: "User doesn't exist"}, {status: 500})
        }
        console.log("User exists");
        
        // check if the password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({error: "Check your credentials"}, {status: 400})
        }

        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1h'})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
        return response;
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}