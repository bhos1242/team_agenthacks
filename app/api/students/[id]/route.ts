import { NextRequest, NextResponse } from "next/server";
import { prisma_db } from "@/lib/prisma";
import { uploadToS3 } from "@/lib/s3";
import { auth } from "@/lib/auth";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> } // Await params starting Next 15+
) {
    try {
        const { id } = await params;
        const student = await prisma_db.student.findUnique({
            where: { id },
            include: {
                donations: {
                    where: { status: "COMPLETED" },
                    select: { id: true, amount: true, createdAt: true, name: true }
                }
            }
        });

        if (!student) {
            return NextResponse.json({ error: "Student not found" }, { status: 404 });
        }

        return NextResponse.json(student);
    } catch (error) {
        console.error("Error fetching single student:", error);
        return NextResponse.json({ error: "Failed to fetch student" }, { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const formData = await req.formData();

        // We update fields dynamically
        const updateData: {
            fullName?: string;
            age?: number;
            standard?: string;
            schoolOrCollege?: string;
            location?: string;
            category?: string;
            story?: string;
            achievements?: string;
            requiredAmount?: number;
            isActive?: boolean;
            photoUrl?: string;
        } = {};

        const fullName = formData.get("fullName") as string;
        if (fullName) updateData.fullName = fullName;

        const age = formData.get("age") as string;
        if (age) updateData.age = parseInt(age, 10);

        const standard = formData.get("standard") as string;
        if (standard) updateData.standard = standard;

        const schoolOrCollege = formData.get("schoolOrCollege") as string;
        if (schoolOrCollege) updateData.schoolOrCollege = schoolOrCollege;

        const location = formData.get("location") as string;
        if (location) updateData.location = location;

        const category = formData.get("category") as string;
        if (category) updateData.category = category;

        const story = formData.get("story") as string;
        if (story) updateData.story = story;

        const achievements = formData.get("achievements") as string;
        if (achievements !== null) updateData.achievements = achievements;

        const requiredAmount = formData.get("requiredAmount") as string;
        if (requiredAmount) updateData.requiredAmount = parseInt(requiredAmount, 10);

        const isActive = formData.get("isActive") as string;
        if (isActive) updateData.isActive = isActive === "true";

        const photoFile = formData.get("photo") as File | null;
        if (photoFile && photoFile.size > 0) {
            const bytes = await photoFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const photoUrl = await uploadToS3(buffer, photoFile.name);
            if (photoUrl) {
                updateData.photoUrl = photoUrl;
            }
        }

        const student = await prisma_db.student.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json(student);
    } catch (error) {
        console.error("Error updating student:", error);
        return NextResponse.json({ error: "Failed to update student" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        await prisma_db.student.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error("Error deleting student:", error);
        return NextResponse.json({ error: "Failed to delete student" }, { status: 500 });
    }
}
