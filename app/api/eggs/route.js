import {NextResponse} from "next/server";
import {pteroserver} from "@/data/functions/ptero/api";

export async function GET(req) {
    const data = await pteroserver.get_eggs()

    return NextResponse.json(data)
}