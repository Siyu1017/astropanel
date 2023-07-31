import {NextResponse} from "next/server";
import {pterouser} from "@/data/functions/ptero/api";
import {get_user_data} from "@/data/functions/auth/auth";

export async function POST(req) {
    const dc_user = await get_user_data()

    await pterouser.reset_pwd(dc_user)

    const data = {
        w:'w'
    }

    // console.log(data)

    return NextResponse.json(data)
}