import { NextRequest, NextResponse } from "next/server";
import { prisma_db } from "@/lib/prisma";
import { uploadToS3 } from "@/lib/s3";
import { auth } from "@/lib/auth";

export async function GET() {
    try {
        const students = await prisma_db.student.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();

        // Parse fields
        const fullName = formData.get("fullName") as string;
        const age = parseInt(formData.get("age") as string, 10);
        const standard = formData.get("standard") as string;
        const schoolOrCollege = formData.get("schoolOrCollege") as string;
        const location = formData.get("location") as string;
        const category = formData.get("category") as string;
        const story = formData.get("story") as string;
        const achievements = formData.get("achievements") as string;
        const requiredAmount = parseInt(formData.get("requiredAmount") as string, 10);
        const photoFile = formData.get("photo") as File | null;

        if (!fullName || !age || !standard || !schoolOrCollege || !location || !category || !story || !requiredAmount || !photoFile) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Upload to S3
        const bytes = await photoFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const photoUrl = await uploadToS3(buffer, photoFile.name);

        if (!photoUrl) {
            return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
        }

        const student = await prisma_db.student.create({
            data: {
                fullName,
                age,
                standard,
                schoolOrCollege,
                location,
                category,
                story,
                achievements: achievements || "",
                requiredAmount,
                photoUrl,
            },
        });

        return NextResponse.json(student, { status: 201 });
    } catch (error) {
        console.error("Error creating student:", error);
        return NextResponse.json({ error: "Failed to create student" }, { status: 500 });
    }
}
