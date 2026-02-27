import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsor Students | Underprivileged Children Education Support",
  description: "Browse student profiles and sponsor a needy child's education in Pune. Your support empowers underprivileged students with quality education.",
  openGraph: {
    title: "Sponsor Students | Underprivileged Children Education Support",
    description: "Support education of tribal and needy students in Pune.",
    url: "/sponsor-students",
    images: [{ url: "/programs/samarpan.png", width: 1200, height: 630 }],
  },
};

export default function StudentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
