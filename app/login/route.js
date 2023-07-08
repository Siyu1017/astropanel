import { redirect } from 'next/navigation'
import * as config from '@/public/auth/config';
import {get_login_link} from "@/public/auth/auth";

export function GET(request) {
    redirect(get_login_link())
}