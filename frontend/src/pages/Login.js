import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import GeometricBackground from '../components/GeometricBackground';
import { setCurrentUser, mockUsers } from '../mockData';
import { MapPin, Users, Shield, CheckCircle } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('user');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Mock login - find user by email and check if they match the selected user type
      const user = mockUsers.find(u => u.email === formData.email);
      if (user && user.role === userType) {
        setCurrentUser(user);
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        alert('Invalid credentials or user type mismatch');
      }
    } else {
      // Mock signup - create new user
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      const newUser = {
        id: `${userType}${Date.now()}`,
        name: formData.name,
        email: formData.email,
        role: userType
      };
      
      setCurrentUser(newUser);
      if (userType === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <GeometricBackground variant="login">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-8">
          
          {/* Hero Section */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-8">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
                Civic
                <span className="text-green-600"> Connect</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Empowering communities to report and resolve civic issues together. 
                Make your city better, one report at a time.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <MapPin className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Report Issues</h3>
                  <p className="text-sm text-gray-600">Quick & easy reporting</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <Users className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Community</h3>
                  <p className="text-sm text-gray-600">Work together</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Get Results</h3>
                  <p className="text-sm text-gray-600">Track progress</p>
                </div>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="w-full max-w-md">
            <Card className="backdrop-blur-sm bg-white/90 shadow-2xl border-green-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {isLogin ? 'Welcome Back' : 'Join Our Community'}
                </CardTitle>
                <p className="text-gray-600">
                  {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
                </p>
              </CardHeader>
              
              <CardContent>
                <Tabs value={userType} onValueChange={setUserType} className="mb-6">
                  <TabsList className="grid w-full grid-cols-2 bg-green-50">
                    <TabsTrigger value="user" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                      <Users className="w-4 h-4 mr-2" />
                      Citizen
                    </TabsTrigger>
                    <TabsTrigger value="admin" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                      <Shield className="w-4 h-4 mr-2" />
                      Admin
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div>
                      <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 border-green-200 focus:border-green-500 focus:ring-green-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 border-green-200 focus:border-green-500 focus:ring-green-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password" className="text-gray-700">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="mt-1 border-green-200 focus:border-green-500 focus:ring-green-500"
                      placeholder="Enter your password"
                    />
                  </div>
                  
                  {!isLogin && (
                    <div>
                      <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="mt-1 border-green-200 focus:border-green-500 focus:ring-green-500"
                        placeholder="Confirm your password"
                      />
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
                  >
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </Button>
                </form>
                
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                  </button>
                </div>

                {/* Demo credentials */}
                <div className="mt-6 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-800 mb-2">Demo Credentials:</p>
                  <div className="text-xs text-green-700 space-y-1">
                    <div>User: john@example.com</div>
                    <div>Admin: mike.admin@city.gov</div>
                    <div>Password: any password</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </GeometricBackground>
  );
};

export default Login;