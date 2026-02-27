import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma_db } from "@/lib/prisma";
import { uploadAvatar } from "@/lib/s3";
import { sendOTPEmail } from "@/lib/email";

// Password validation schema with complexity rules
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

export async function POST(req: NextRequest) {
  try {
    // Parse form data
    const formData = await req.formData();
    
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate input
    const validatedData = signupSchema.parse({ name, email, password });

    // Check if user already exists
    const existingUser = await prisma_db.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Upload avatar to S3 (if provided)
    let avatarUrl: string | null = null;
    try {
      avatarUrl = await uploadAvatar(formData);
    } catch (error) {
      console.error("Avatar upload failed:", error);
      // Continue without avatar if upload fails
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create user
    const user = await prisma_db.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        image: avatarUrl,
        role: "USER",
        isVerified: false,
      },
    });

    // Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP to database
    await prisma_db.oTP.create({
      data: {
        email: user.email!,
        code: otp,
        expiresAt,
        verified: false,
      },
    });

    // Send OTP email
    const emailResult = await sendOTPEmail(user.email!, otp, user.name || undefined);
    
    if (!emailResult.success) {
      // If email fails, delete the user and return error
      await prisma_db.user.delete({ where: { id: user.id } });
      return NextResponse.json(
        { error: "Failed to send verification email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Signup successful! Please check your email for OTP verification.",
        email: user.email,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
