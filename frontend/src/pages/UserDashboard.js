import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import GeometricBackground from '../components/GeometricBackground';
import IssueCard from '../components/IssueCard';
import { getCurrentUser, mockIssues } from '../mockData';
import { Plus, MapPin, BarChart3, Clock, CheckCircle, AlertCircle, LogOut } from 'lucide-react';

const UserDashboard = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [activeTab, setActiveTab] = useState('my-issues');
  const [userIssues, setUserIssues] = useState([]);
  const [nearbyIssues, setNearbyIssues] = useState([]);

  useEffect(() => {
    // Filter issues for current user
    const myIssues = mockIssues.filter(issue => issue.reportedBy === user?.id);
    setUserIssues(myIssues);
    
    // Mock nearby issues (in real app, this would be location-based)
    const nearby = mockIssues.filter(issue => issue.reportedBy !== user?.id);
    setNearbyIssues(nearby);
  }, [user]);

  const handleLogout = () => {
    navigate('/');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getStatusCounts = () => {
    const counts = {
      pending: userIssues.filter(issue => issue.status === 'Pending').length,
      inProgress: userIssues.filter(issue => issue.status === 'In Progress').length,
      resolved: userIssues.filter(issue => issue.status === 'Resolved').length,
      total: userIssues.length
    };
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <GeometricBackground variant="dashboard">
      <div className="min-h-screen">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm border-b border-green-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Civic <span className="text-green-600">Connect</span>
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Welcome back,</p>
                  <p className="font-semibold text-gray-900">{user?.name}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {getGreeting()}, {user?.name?.split(' ')[0]}!
            </h2>
            <p className="text-gray-600 text-lg">
              Ready to make your community better? Report issues or track your existing reports.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Total Reports</p>
                    <p className="text-2xl font-bold text-gray-900">{statusCounts.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">{statusCounts.pending}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-gray-900">{statusCounts.inProgress}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Resolved</p>
                    <p className="text-2xl font-bold text-gray-900">{statusCounts.resolved}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Report Issue CTA */}
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                See something that needs fixing?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Report civic issues in your community and help make your city a better place for everyone.
              </p>
              <Button
                onClick={() => navigate('/report')}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold"
              >
                <Plus className="w-5 h-5 mr-2" />
                Report a Civic Issue
              </Button>
            </CardContent>
          </Card>

          {/* Issues Tabs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Your Reports & Community Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 bg-green-50">
                  <TabsTrigger value="my-issues" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                    My Issues ({userIssues.length})
                  </TabsTrigger>
                  <TabsTrigger value="nearby-issues" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                    <MapPin className="w-4 h-4 mr-2" />
                    Community Issues ({nearbyIssues.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="my-issues" className="mt-6">
                  {userIssues.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-12 h-12 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No reports yet</h3>
                      <p className="text-gray-600 mb-6">Start by reporting your first civic issue</p>
                      <Button
                        onClick={() => navigate('/report')}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Report an Issue
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2">
                      {userIssues.map((issue) => (
                        <IssueCard key={issue.id} issue={issue} />
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="nearby-issues" className="mt-6">
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 text-blue-800">
                      <MapPin className="w-5 h-5" />
                      <p className="font-medium">Community Issues Near You</p>
                    </div>
                    <p className="text-sm text-blue-700 mt-1">
                      Map integration will be added to show location-based issues
                    </p>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    {nearbyIssues.map((issue) => (
                      <IssueCard key={issue.id} issue={issue} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </GeometricBackground>
  );
};

export default UserDashboard;