import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Badge from "../ui/badge";
import Button from "../ui/button";
import {
  Calendar,
  Clock,
  MessageSquare,
  Bell,
  TrendingUp,
  Users,
  Activity,
  AlertCircle,
} from "lucide-react";

const DashboardWidget = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, Admin
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your healthcare system today.
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Appointments Today */}
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Appointments Today
            </CardTitle>
            <Calendar className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">24</div>
            <div className="flex items-center text-sm text-success mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              +12% from yesterday
            </div>
          </CardContent>
        </Card>

        {/* Pending Bookings */}
        <Card className="border-l-4 border-l-warning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Pending Bookings
            </CardTitle>
            <Clock className="h-5 w-5 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">8</div>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              Awaiting confirmation
            </div>
          </CardContent>
        </Card>

        {/* Chat Sessions Overview */}
        <Card className="border-l-4 border-l-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Chat Sessions
            </CardTitle>
            <MessageSquare className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">12</div>
            <div className="flex items-center text-sm text-secondary mt-1">
              <Activity className="h-4 w-4 mr-1" />
              3 new conversations
            </div>
          </CardContent>
        </Card>

        {/* Notifications/Alerts */}
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Urgent Alerts
            </CardTitle>
            <Bell className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">3</div>
            <div className="flex items-center text-sm text-red-600 mt-1">
              <AlertCircle className="h-4 w-4 mr-1" />
              Requires attention
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Recent Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              Today's Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  time: "9:00 AM",
                  patient: "John Smith",
                  type: "Consultation",
                  status: "confirmed",
                },
                {
                  time: "10:30 AM",
                  patient: "Sarah Johnson",
                  type: "Follow-up",
                  status: "confirmed",
                },
                {
                  time: "2:00 PM",
                  patient: "Mike Brown",
                  type: "Check-up",
                  status: "pending",
                },
                {
                  time: "3:30 PM",
                  patient: "Lisa Davis",
                  type: "Consultation",
                  status: "confirmed",
                },
              ].map((appointment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium text-gray-900">
                      {appointment.time}
                    </div>
                    <div>
                      <div className="text-sm font-medium">
                        {appointment.patient}
                      </div>
                      <div className="text-xs text-gray-500">
                        {appointment.type}
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={
                      appointment.status === "confirmed"
                        ? "default"
                        : "secondary"
                    }
                    className={
                      appointment.status === "confirmed"
                        ? "bg-success text-success-foreground"
                        : "bg-warning text-warning-foreground"
                    }
                  >
                    {appointment.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View All Appointments
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-secondary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  icon: MessageSquare,
                  text: "New chat message from Patient #1234",
                  time: "2 min ago",
                  type: "chat",
                },
                {
                  icon: Users,
                  text: "Patient registration completed",
                  time: "15 min ago",
                  type: "registration",
                },
                {
                  icon: Calendar,
                  text: "Appointment scheduled for tomorrow",
                  time: "1 hour ago",
                  type: "appointment",
                },
                {
                  icon: AlertCircle,
                  text: "System maintenance scheduled",
                  time: "2 hours ago",
                  type: "alert",
                },
              ].map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start space-x-3 py-2">
                    <div className="flex-shrink-0">
                      <Icon className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.text}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-12 bg-primary hover:bg-primary/90">
              Schedule New Appointment
            </Button>
            <Button className="h-12 bg-secondary hover:bg-secondary/90">
              Add New Patient
            </Button>
            <Button className="h-12 bg-warning hover:bg-warning/90 text-warning-foreground">
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default DashboardWidget;