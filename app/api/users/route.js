import {NextResponse} from "next/server";
import {get_user_data} from "@/data/functions/auth/auth";
import {pteroadmin, pterouser} from "@/data/functions/ptero/api";

export async function GET(req) {
    const dc_user = await get_user_data()
    if (await pterouser.is_admin(dc_user.id) === true) {
        const data = await pteroadmin.get_users()
        return NextResponse.json(data)
    }
}