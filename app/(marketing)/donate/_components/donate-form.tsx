"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import Script from "next/script"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import InputField from "@/components/AppInputFields/InputField"
import { Lock, Heart, Loader2 } from "lucide-react"

// Strict Razorpay Types to avoid 'any'
import { RazorpayOptions, RazorpaySuccessResponse, RazorpayErrorResponse } from "@/types/razorpay"

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      on: (event: string, handler: (response: RazorpayErrorResponse) => void) => void;
      open: () => void;
    };
  }
}

const donateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number").max(15, "Please enter a valid phone number"),
  amount: z.number().min(1, "Amount must be at least ₹1")
})

type DonateFormValues = z.infer<typeof donateSchema>

const PRESET_AMOUNTS = [500, 1000, 2500, 5000]

export function DonateForm() {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false)
    const [customAmount, setCustomAmount] = useState<string>("")

    const form = useForm<DonateFormValues>({
        resolver: zodResolver(donateSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            amount: 1000,
        },
    })

    const selectedAmount = form.watch("amount")

    const handlePresetClick = (amount: number) => {
        setCustomAmount("")
        form.setValue("amount", amount, { shouldValidate: true })
    }


    const createOrderMutation = useMutation({
        mutationFn: async (data: { amount: number }) => {
            const res = await fetch("/api/razorpay/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
            if (!res.ok) {
                const err = await res.json()
                throw new Error(err.error || "Failed to create order")
            }
            return res.json()
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })

    const onSubmit = async (data: DonateFormValues) => {
        if (!isScriptLoaded) {
            toast.error("Payment system is still loading. Please wait a moment.")
            return
        }

        try {
            const order = await createOrderMutation.mutateAsync({ amount: data.amount })

            if (!order || !order.id) {
                throw new Error("Invalid order generated")
            }

            const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

            const options: RazorpayOptions = {
                key: razorpayKey,
                amount: order.amount,
                currency: order.currency,
                name: "Seva Samarpan",
                description: "Donation for Education and Elder Care",
                image: "https://sevasamarpan.org/icon.svg", // Replace with your actual logo
                order_id: order.id,
                handler: async function (response: RazorpaySuccessResponse) {
                    try {
                        const verifyRes = await fetch("/api/donations/verify", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                name: data.name,
                                email: data.email,
                                phone: data.phone,
                                amount: data.amount,
                            }),
                        });
                        
                        if (!verifyRes.ok) throw new Error("Verification failed");
                        
                        toast.success(`Thank you, ${data.name}! Your donation of ₹${data.amount} was successful. (ID: ${response.razorpay_payment_id})`);
                        form.reset();
                    } catch (err) {
                         toast.error("Payment successful but verification failed. Please contact support.");
                         console.error("Verification Error:", err);
                    }
                },
                prefill: {
                    name: data.name,
                    email: data.email,
                    contact: data.phone,
                },
                theme: {
                    color: "#f97316", // Tailwind orange-500 (Primary color match)
                },
            }

            const rzp1 = new window.Razorpay(options)
            
            rzp1.on('payment.failed', function (response: RazorpayErrorResponse) {
                toast.error("Payment Failed. Reason: " + response.error.description)
            })

            rzp1.open()

        } catch (error) {
            console.error(error)
             // mutate error is handled in onError
        }
    }

    return (
        <Card className="border-none shadow-xl bg-card rounded-2xl md:rounded-[2rem] overflow-hidden ring-1 ring-border/50">
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="lazyOnload"
                onLoad={() => setIsScriptLoaded(true)}
                onError={() => toast.error("Failed to load payment gateway")}
            />
            
            <CardHeader className="bg-primary/5 pb-4 md:pb-6 pt-6 md:pt-8 text-center border-b">
                <CardTitle className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-1 md:mb-2">Secure Donation</CardTitle>
                <CardDescription className="text-sm md:text-base font-medium">Join us in making a difference today.</CardDescription>
            </CardHeader>
            
            <CardContent className="p-4 md:p-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
                    {/* Amount Selection */}
                    <div className="space-y-3 md:space-y-4">
                        <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground">Select Amount (₹)</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                            {PRESET_AMOUNTS.map((amt) => (
                                <Button
                                    key={amt}
                                    type="button"
                                    variant={selectedAmount === amt && !customAmount ? 'default' : 'outline'}
                                    onClick={() => handlePresetClick(amt)}
                                    className="h-12 md:h-14 font-bold text-base md:text-lg rounded-xl"
                                >
                                    ₹{amt}
                                </Button>
                            ))}
                        </div>
                        <div className="pt-1 md:pt-2">
                            <InputField 
                                name="amount"
                                type="number"
                                placeholder="Other Amount (₹)"
                                className="h-12 md:h-14 bg-muted/30 border-none font-bold text-base md:text-lg rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                        <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground">Your Details</label>
                        
                        <div className="space-y-3 md:space-y-4">
                            <InputField 
                                name="name"
                                type="text"
                                placeholder="Full Name"
                                className="h-12 md:h-14 bg-muted/30 border-none rounded-xl"
                            />

                            <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                                <InputField 
                                    name="email"
                                    type="email"
                                    placeholder="Email Address"
                                    className="h-12 md:h-14 bg-muted/30 border-none rounded-xl"
                                />
                                <InputField 
                                    name="phone"
                                    type="phone"
                                    placeholder="Phone Number"
                                    className="h-12 md:h-14 bg-muted/30 border-none rounded-xl"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-2 md:pt-4 space-y-3 md:space-y-4">
                        <Button 
                            type="submit" 
                            size="lg" 
                            className="w-full h-14 md:h-16 rounded-xl md:rounded-2xl text-base md:text-lg font-black uppercase shadow-lg md:shadow-xl hover:scale-[1.02] transition-transform shadow-primary/20 gap-2"
                            disabled={createOrderMutation.isPending || !isScriptLoaded}
                        >
                            {createOrderMutation.isPending ? (
                                <Loader2 className="h-5 w-5 md:h-6 md:w-6 animate-spin" />
                            ) : (
                                <Heart className="h-5 w-5 md:h-6 md:w-6 fill-current" />
                            )}
                            Donate {selectedAmount ? `₹${selectedAmount}` : ''}
                        </Button>

                        <div className="flex items-center justify-center gap-1.5 md:gap-2 text-muted-foreground text-[10px] md:text-xs font-bold uppercase tracking-wider">
                             <Lock className="h-3 w-3 md:h-4 md:w-4" /> 
                             100% Secure Payment by Razorpay
                        </div>
                    </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
