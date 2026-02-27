import { NextRequest, NextResponse } from "next/server";
import { prisma_db } from "@/lib/prisma";
import crypto from "crypto";
import { sendDonationReceipt } from "@/lib/email";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            name,
            email,
            phone,
            amount,
            studentId,
            require80G,
            panNumber
        } = data;

        // Verify signature
        const keySecret = process.env.NEXT_RAZORPAY_KEY_SECRET || process.env.RAZORPAY_KEY_SECRET;

        if (!keySecret) {
            console.error("Razorpay Secret is missing on the server.");
            return NextResponse.json({ error: "Configuration error" }, { status: 500 });
        }

        const text = razorpay_order_id + "|" + razorpay_payment_id;
        const generated_signature = crypto
            .createHmac("sha256", keySecret)
            .update(text)
            .digest("hex");

        if (generated_signature !== razorpay_signature) {
            return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
        }

        // Begin database transaction to ensure atomicity
        const result = await prisma_db.$transaction(async (tx) => {
            // 1. Create Donation Record
            const donation = await tx.donation.create({
                data: {
                    name,
                    email,
                    phone,
                    amount,
                    paymentId: razorpay_payment_id,
                    orderId: razorpay_order_id,
                    status: "COMPLETED",
                    studentId: studentId || null,
                    require80G: require80G || false,
                    panNumber: panNumber || null,
                }
            });

            // 2. If it's linked to a student, increment their collectedAmount & donorCount
            let student = null;
            if (studentId) {
                student = await tx.student.update({
                    where: { id: studentId },
                    data: {
                        collectedAmount: { increment: amount },
                        donorCount: { increment: 1 },
                    }
                });

                // Recalculate progress percentage
                if (student.requiredAmount > 0) {
                    const newProgress = Math.min(100, Math.round((student.collectedAmount / student.requiredAmount) * 100));
                    await tx.student.update({
                        where: { id: studentId },
                        data: { progressPercentage: newProgress }
                    });
                }
            }

            return { donation, student };
        });

        // Send receipt asynchronously (non-blocking)
        sendDonationReceipt(result.donation).catch(e => console.error("Receipt email failed:", e));

        return NextResponse.json({ success: true, donation: result.donation }, { status: 200 });

    } catch (error) {
        console.error("Donation verification error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
