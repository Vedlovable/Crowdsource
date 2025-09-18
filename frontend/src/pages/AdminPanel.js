import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import GeometricBackground from '../components/GeometricBackground';
import IssueCard from '../components/IssueCard';
import { getCurrentUser, mockIssues, issueCategories, setCurrentUser } from '../mockData';
import { 
  Search, 
  Filter, 
  BarChart3, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Users,
  MapPin,
  LogOut,
  Settings
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const AdminPanel = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const { toast } = useToast();
  const [issues, setIssues] = useState(mockIssues);
  const [filteredIssues, setFilteredIssues] = useState(mockIssues);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    location: ''
  });
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    filterIssues();
  }, [filters, issues, activeTab]);

  const filterIssues = () => {
    let filtered = [...issues];

    // Filter by tab
    if (activeTab === 'pending') {
      filtered = filtered.filter(issue => issue.status === 'Pending');
    } else if (activeTab === 'in-progress') {
      filtered = filtered.filter(issue => issue.status === 'In Progress');
    } else if (activeTab === 'resolved') {
      filtered = filtered.filter(issue => issue.status === 'Resolved');
    }

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(issue =>
        issue.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        issue.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        issue.location.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(issue => issue.category === filters.category);
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(issue => issue.status === filters.status);
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(issue =>
        issue.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredIssues(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? '' : value
    }));
  };

  const handleAssignIssue = (issueId) => {
    setIssues(prev => prev.map(issue =>
      issue.id === issueId
        ? { ...issue, status: 'In Progress', adminAssigned: user?.id }
        : issue
    ));
    
    toast({
      title: "Issue Assigned",
      description: "Issue has been assigned to you and marked as In Progress."
    });
  };

  const handleResolveIssue = (issueId) => {
    setIssues(prev => prev.map(issue =>
      issue.id === issueId
        ? { ...issue, status: 'Resolved' }
        : issue
    ));
    
    toast({
      title: "Issue Resolved",
      description: "Issue has been marked as resolved."
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const getStats = () => {
    return {
      total: issues.length,
      pending: issues.filter(issue => issue.status === 'Pending').length,
      inProgress: issues.filter(issue => issue.status === 'In Progress').length,
      resolved: issues.filter(issue => issue.status === 'Resolved').length
    };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Professional Admin Header */}
      <header className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Administrative Control Panel
                </h1>
                <p className="text-sm text-slate-300">Civic Issue Management & Resolution System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-sm text-slate-300">System Administrator</p>
                </div>
                <p className="font-semibold text-white">{user?.name}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white bg-slate-800"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-red-600 text-red-400 hover:bg-red-900 hover:text-red-300 bg-slate-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Total Issues</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
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
                    <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Resolved</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.resolved}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-green-600" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search issues..."
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      className="pl-10 border-green-200 focus:border-green-500"
                    />
                  </div>
                </div>
                
                <Select value={filters.category || ""} onValueChange={(value) => handleFilterChange('category', value)}>
                  <SelectTrigger className="border-green-200 focus:border-green-500">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {issueCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filters.status || ""} onValueChange={(value) => handleFilterChange('status', value)}>
                  <SelectTrigger className="border-green-200 focus:border-green-500">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Location..."
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="pl-10 border-green-200 focus:border-green-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Issues List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" />
                Issue Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4 bg-green-50">
                  <TabsTrigger value="all" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                    All Issues ({issues.length})
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                    Pending ({stats.pending})
                  </TabsTrigger>
                  <TabsTrigger value="in-progress" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                    In Progress ({stats.inProgress})  
                  </TabsTrigger>
                  <TabsTrigger value="resolved" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                    Resolved ({stats.resolved})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-6">
                  {filteredIssues.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="w-12 h-12 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No issues found</h3>
                      <p className="text-gray-600">Try adjusting your filters or search terms</p>
                    </div>
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {filteredIssues.map((issue) => (
                        <IssueCard
                          key={issue.id}
                          issue={issue}
                          showActions={true}
                          onAssign={handleAssignIssue}
                          onResolve={handleResolveIssue}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </GeometricBackground>
  );
};

export default AdminPanel;