import { StatsCard } from "@/components/stats-card";
import { BarChart, LineChart } from "@/components/charts";
import { Users, HeartHandshake, IndianRupee, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TestNotificationButton } from "@/components/test-notification-button";
import { prisma_db } from "@/lib/prisma";

interface DonationStat {
    amount: number;
    createdAt: Date;
}

interface MonthlyRevenueStat {
    month: string;
    revenue: number;
    [key: string]: string | number;
}

interface MonthlyDonationStat {
    month: string;
    donations: number;
    [key: string]: string | number;
}


export default async function DashboardPage() {

  // Fetch actual stats from database
  const [
      totalStudents, 
      totalDonationsCount, 
      totalRevenueResult, 
      recentDonations,
      allDonations
  ] = await Promise.all([
    prisma_db.student.count(),
    prisma_db.donation.count({ where: { status: "COMPLETED" } }),
    prisma_db.donation.aggregate({
        _sum: { amount: true },
        where: { status: "COMPLETED" }
    }),
    prisma_db.donation.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        where: { status: "COMPLETED" },
        include: { student: true }
    }),
    // Fetch all for trends (in a real scale app, do this with groupBy or queryRaw)
    prisma_db.donation.findMany({
        where: { status: "COMPLETED" },
        select: { amount: true, createdAt: true }
    })
  ]);

  const totalRevenue = totalRevenueResult._sum.amount || 0;
  
  const formattedRevenue = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
  }).format(totalRevenue);

  // Calculate monthly stats for the last 6 months
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const revenueData: MonthlyRevenueStat[] = [];
  const donationsData: MonthlyDonationStat[] = [];
  
  for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const m = d.getMonth();
      const y = d.getFullYear();
      
      const monthDonations = allDonations.filter((don: DonationStat) => {
          const donDate = new Date(don.createdAt);
          return donDate.getMonth() === m && donDate.getFullYear() === y;
      });

      const monthRev = monthDonations.reduce((acc: number, curr: DonationStat) => acc + curr.amount, 0);
      
      revenueData.push({ month: monthNames[m], revenue: monthRev });
      donationsData.push({ month: monthNames[m], donations: monthDonations.length });
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground hidden sm:block">
            Welcome back! Here&apos;s your NGO&apos;s real-time impact.
          </p>
        </div>
        <TestNotificationButton />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value={totalStudents.toString()}
          description="enrolled in programs"
          icon={Users}
        />
        <StatsCard
          title="Total Donations"
          value={totalDonationsCount.toString()}
          description="completed contributions"
          icon={HeartHandshake}
        />
        <StatsCard
          title="Total Funds Raised"
          value={formattedRevenue}
          description="lifetime collections"
          icon={IndianRupee}
        />
        <StatsCard
          title="Active Projects"
          value="3" // Default stat since projects aren't dynamic yet
          description="ongoing initiatives"
          icon={TrendingUp}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-3 md:gap-4 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Monthly Donations</CardTitle>
          </CardHeader>
          <CardContent className="h-48 md:h-64 flex items-center justify-center p-4 pt-0">
            <BarChart
              data={donationsData}
              dataKey="donations"
              xAxisKey="month"
              barColor="#f97316"
              className="w-full h-full"
            />
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Revenue Trend (₹)</CardTitle>
          </CardHeader>
          <CardContent className="h-48 md:h-64 flex items-center justify-center p-4 pt-0">
            <LineChart
              data={revenueData}
              dataKey="revenue"
              xAxisKey="month"
              lineColor="#16a34a"
              className="w-full h-full"
            />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-sm">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base">Recent Contributions</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            {recentDonations.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">No recent donations yet.</p>
            ) : (
                recentDonations.map((donation: { id: string; name: string; amount: number; createdAt: Date; student: { fullName: string } | null }) => (
                    <div key={donation.id} className="flex items-center justify-between border-b border-border/50 pb-2 last:border-0 last:pb-0">
                      <div>
                        <p className="text-sm font-medium leading-none mb-1">
                            {donation.name} donated ₹{donation.amount}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {new Date(donation.createdAt).toLocaleDateString()} {donation.student ? `• Sponsored: ${donation.student.fullName}` : '• General Donation'}
                        </p>
                      </div>
                      <div className="text-sm font-bold text-green-600">
                          +₹{donation.amount}
                      </div>
                    </div>
                ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
