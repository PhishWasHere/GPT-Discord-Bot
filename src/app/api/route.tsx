'use server'

import { NextResponse } from 'next/server';

export async function GET(){
    try{
        const data = 'route hit';
        return NextResponse.json(data);
    } catch(err) {
        console.log(err);
        return NextResponse.error();
    }
}