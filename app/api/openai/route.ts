import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
})

export async function GET(req: NextRequest) {
    const term = req.nextUrl.searchParams.get('term') as string

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are an expert assistant in the 50 30 20 method, which is a method that proposes spending money on 50% needs, 30% desires and 20% savings and investments",
                },
                {
                    role: "user",
                    content: `I like ${term}`
                },
            ],
        });

        return NextResponse.json({ suggestion: completion.choices[0].message.content || "No suggestions" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" });
    }
}