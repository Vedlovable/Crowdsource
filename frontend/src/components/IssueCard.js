import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Calendar, User } from 'lucide-react';

const IssueCard = ({ issue, showActions = false, onAssign, onResolve }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'border-yellow-500 bg-yellow-50 text-yellow-800';
      case 'In Progress':
        return 'border-blue-500 bg-blue-50 text-blue-800';
      case 'Resolved':
        return 'border-green-500 bg-green-50 text-green-800';
      default:
        return 'border-gray-500 bg-gray-50 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Roads': 'bg-stone-100 text-stone-800 border-stone-300',
      'Utilities': 'bg-emerald-100 text-emerald-800 border-emerald-300',
      'Waste': 'bg-green-100 text-green-800 border-green-300',
      'Parks': 'bg-lime-100 text-lime-800 border-lime-300',
      'Public Transportation': 'bg-teal-100 text-teal-800 border-teal-300',
      'Traffic Signals': 'bg-orange-100 text-orange-800 border-orange-300',
      'Sidewalks': 'bg-slate-100 text-slate-800 border-slate-300',
      'Street Cleaning': 'bg-cyan-100 text-cyan-800 border-cyan-300',
      'Noise Complaints': 'bg-red-100 text-red-800 border-red-300',
      'Other': 'bg-gray-100 text-gray-800 border-gray-300'
    };
    return colors[category] || colors['Other'];
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500 hover:border-l-green-600">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-3">
          <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
            {issue.title}
          </CardTitle>
          <Badge className={`${getStatusColor(issue.status)} border font-medium shrink-0`}>
            {issue.status}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className={`${getCategoryColor(issue.category)} border`}>
            {issue.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {issue.image && (
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src={issue.image} 
              alt={issue.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <p className="text-gray-600 text-sm leading-relaxed">
          {issue.description}
        </p>
        
        <div className="flex flex-col gap-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-green-600" />
            <span>{issue.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-600" />
            <span>Reported: {new Date(issue.dateReported).toLocaleDateString()}</span>
          </div>
          {issue.adminAssigned && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-green-600" />
              <span>Assigned to: {issue.adminAssigned}</span>
            </div>
          )}
        </div>

        {showActions && issue.status !== 'Resolved' && (
          <div className="flex gap-2 pt-3 border-t border-gray-100">
            {issue.status === 'Pending' && onAssign && (
              <button
                onClick={() => onAssign(issue.id)}
                className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors flex-1"
              >
                Assign to Me
              </button>
            )}
            {issue.status === 'In Progress' && onResolve && (
              <button
                onClick={() => onResolve(issue.id)}
                className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-md hover:bg-emerald-700 transition-colors flex-1"
              >
                Mark Resolved
              </button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IssueCard;