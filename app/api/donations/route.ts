import { NextResponse } from "next/server";
import { prisma_db } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// Fetch all donations (Admin only)
export async function GET() {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const donations = await prisma_db.donation.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                student: {
                    select: {
                        fullName: true
                    }
                }
            }
        });

        return NextResponse.json(donations);
    } catch (error) {
        console.error("Error fetching donations:", error);
        return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 });
    }
}
