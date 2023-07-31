import {NextResponse} from "next/server";
import {get_user_data} from "@/data/functions/auth/auth";

export async function GET(req) {
    const dc_user = await get_user_data()

    return NextResponse.json(dc_user)
}