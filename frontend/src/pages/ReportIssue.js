import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import GeometricBackground from '../components/GeometricBackground';
import { getCurrentUser, issueCategories, mockIssues } from '../mockData';
import { ArrowLeft, Upload, MapPin, Camera, AlertCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const ReportIssue = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, this would reverse geocode the coordinates
          const location = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
          setFormData(prev => ({
            ...prev,
            location: location
          }));
          toast({
            title: "Location detected",
            description: "GPS coordinates have been added to your report."
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enter it manually.",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support location services.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.title || !formData.description || !formData.category || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create new issue (in real app, this would be sent to backend)
    const newIssue = {
      id: mockIssues.length + 1,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      status: 'Pending',
      location: formData.location,
      dateReported: new Date().toISOString().split('T')[0],
      reportedBy: user?.id,
      adminAssigned: null,
      image: imagePreview // In real app, this would be uploaded to storage
    };

    // Add to mock data
    mockIssues.push(newIssue);

    toast({
      title: "Issue Reported Successfully!",
      description: "Your civic issue has been submitted and will be reviewed by city officials."
    });

    setIsSubmitting(false);
    navigate('/dashboard');
  };

  return (
    <GeometricBackground>
      <div className="min-h-screen">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm border-b border-green-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center py-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="mr-4 text-green-700 hover:bg-green-50"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">
                Report a Civic Issue
              </h1>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Form Section */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-green-200">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                    <AlertCircle className="w-6 h-6 text-green-600 mr-2" />
                    Issue Details
                  </CardTitle>
                  <p className="text-gray-600">
                    Please provide detailed information about the civic issue you want to report.
                  </p>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                      <Label htmlFor="title" className="text-gray-700 font-medium">
                        Issue Title *
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        type="text"
                        required
                        value={formData.title}
                        onChange={handleInputChange}
                        className="mt-2 border-green-200 focus:border-green-500 focus:ring-green-500"
                        placeholder="Brief description of the issue"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <Label className="text-gray-700 font-medium">Category *</Label>
                      <Select value={formData.category || ""} onValueChange={handleCategoryChange}>
                        <SelectTrigger className="mt-2 border-green-200 focus:border-green-500">
                          <SelectValue placeholder="Select issue category" />
                        </SelectTrigger>
                        <SelectContent>
                          {issueCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Location */}
                    <div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="location" className="text-gray-700 font-medium">
                          Location *
                        </Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={getCurrentLocation}
                          className="border-green-200 text-green-700 hover:bg-green-50"
                        >
                          <MapPin className="w-4 h-4 mr-2" />
                          Use Current Location
                        </Button>
                      </div>
                      <Input
                        id="location"
                        name="location"
                        type="text"
                        required
                        value={formData.location}
                        onChange={handleInputChange}
                        className="mt-2 border-green-200 focus:border-green-500 focus:ring-green-500"
                        placeholder="Enter address or landmark"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <Label htmlFor="description" className="text-gray-700 font-medium">
                        Detailed Description *
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        required
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className="mt-2 border-green-200 focus:border-green-500 focus:ring-green-500 resize-none"
                        placeholder="Provide a detailed description of the issue, including any relevant context or safety concerns"
                      />
                    </div>

                    {/* Image Upload */}
                    <div>
                      <Label className="text-gray-700 font-medium">
                        Photo Evidence (Optional)
                      </Label>
                      <div className="mt-2">
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-green-300 border-dashed rounded-lg cursor-pointer bg-green-50 hover:bg-green-100 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              {imagePreview ? (
                                <div className="relative">
                                  <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-20 h-20 object-cover rounded-lg"
                                  />
                                </div>
                              ) : (
                                <>
                                  <Camera className="w-8 h-8 mb-2 text-green-600" />
                                  <p className="text-sm text-green-700">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                  </p>
                                  <p className="text-xs text-green-600">PNG, JPG up to 10MB</p>
                                </>
                              )}
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Submitting Report...
                          </div>
                        ) : (
                          <>
                            <Upload className="w-5 h-5 mr-2" />
                            Submit Issue Report
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Reporting Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Be Specific</h4>
                      <p className="text-sm text-gray-600">Provide exact location and detailed description</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Include Photos</h4>
                      <p className="text-sm text-gray-600">Images help officials understand the issue better</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Safety First</h4>
                      <p className="text-sm text-gray-600">Mark urgent safety hazards clearly</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-green-800 mb-2">What happens next?</h4>
                  <div className="space-y-2 text-sm text-green-700">
                    <p>1. Your report is reviewed by city officials</p>
                    <p>2. Issue is assigned to the appropriate department</p>
                    <p>3. You'll receive updates on progress</p>
                    <p>4. Issue is resolved and marked complete</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </GeometricBackground>
  );
};

export default ReportIssue;