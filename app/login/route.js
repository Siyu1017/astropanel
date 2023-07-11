import { redirect } from 'next/navigation'
import * as config from '@/data/functions/auth/config';
import {get_login_link} from "@/data/functions/auth/auth";

export function GET(request) {
    redirect(get_login_link())
}