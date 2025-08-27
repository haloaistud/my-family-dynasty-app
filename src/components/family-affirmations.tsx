
"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

const affirmations = [
    "Our family is built on a foundation of love and support.",
    "We celebrate each other's successes and support each other's struggles.",
    "Our bond is a source of strength and comfort.",
    "We cherish our shared memories and create new ones with joy.",
    "Through every generation, our family's love endures.",
    "We are a tapestry of unique individuals woven together by love."
];

export default function FamilyAffirmations() {
    const [affirmation, setAffirmation] = useState("");

    useEffect(() => {
        // Set affirmation on client-side to avoid hydration mismatch
        setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
    }, []);


    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Heart className="text-primary" />
                    Daily Affirmation
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-center text-lg italic text-muted-foreground">
                    "{affirmation}"
                </p>
            </CardContent>
        </Card>
    );
}
