import { redirect } from 'next/navigation';
import {get_login_link} from "@/data/functions/auth/auth";

export function GET(req) {
    redirect(get_login_link())
}