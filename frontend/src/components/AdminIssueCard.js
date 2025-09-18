import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Calendar, User, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

const AdminIssueCard = ({ issue, onAssign, onResolve }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'border-amber-500 bg-amber-50 text-amber-800';
      case 'In Progress':
        return 'border-purple-500 bg-purple-50 text-purple-800';
      case 'Resolved':
        return 'border-emerald-500 bg-emerald-50 text-emerald-800';
      default:
        return 'border-gray-500 bg-gray-50 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-4 h-4" />;
      case 'In Progress':
        return <AlertTriangle className="w-4 h-4" />;
      case 'Resolved':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Roads': 'bg-stone-100 text-stone-800 border-stone-300',
      'Utilities': 'bg-blue-100 text-blue-800 border-blue-300',
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

  const getPriorityLevel = (status, category) => {
    if (category === 'Utilities' || category === 'Traffic Signals') return 'High';
    if (status === 'Pending') return 'Medium';
    return 'Normal';
  };

  const priority = getPriorityLevel(issue.status, issue.category);

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-slate-600 hover:border-l-blue-600 bg-white">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-3">
          <CardTitle className="text-lg font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
            {issue.title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={`${getStatusColor(issue.status)} border font-medium shrink-0 flex items-center gap-1`}>
              {getStatusIcon(issue.status)}
              {issue.status}
            </Badge>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className={`${getCategoryColor(issue.category)} border`}>
            {issue.category}
          </Badge>
          <Badge 
            variant="outline" 
            className={`border ${priority === 'High' ? 'border-red-300 bg-red-50 text-red-700' : 
                             priority === 'Medium' ? 'border-yellow-300 bg-yellow-50 text-yellow-700' : 
                             'border-gray-300 bg-gray-50 text-gray-700'}`}
          >
            {priority} Priority
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {issue.image && (
          <div className="relative overflow-hidden rounded-lg border border-slate-200">
            <img 
              src={issue.image} 
              alt={issue.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2">
              <Badge className="bg-black/70 text-white text-xs">
                Evidence Photo
              </Badge>
            </div>
          </div>
        )}
        
        <p className="text-slate-600 text-sm leading-relaxed">
          {issue.description}
        </p>
        
        <div className="grid grid-cols-1 gap-2 text-sm text-slate-500 bg-slate-50 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="font-medium">Location:</span>
            <span>{issue.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="font-medium">Reported:</span>
            <span>{new Date(issue.dateReported).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            <span className="font-medium">Reporter ID:</span>
            <span>{issue.reportedBy}</span>
          </div>
          {issue.adminAssigned && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-purple-600" />
              <span className="font-medium">Assigned to:</span>
              <span className="text-purple-600 font-medium">{issue.adminAssigned}</span>
            </div>
          )}
        </div>

        {/* Admin Action Buttons */}
        <div className="pt-3 border-t border-slate-200">
          {issue.status === 'Resolved' ? (
            <div className="flex items-center justify-between bg-emerald-50 p-3 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-700 font-medium">Issue Resolved</span>
              </div>
              {issue.adminAssigned && (
                <span className="text-sm text-emerald-600">by {issue.adminAssigned}</span>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex gap-2">
                {/* Assign Button */}
                {(issue.status === 'Pending' || !issue.adminAssigned) && onAssign && (
                  <button
                    onClick={() => onAssign(issue.id)}
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors flex-1 font-medium shadow-sm"
                  >
                    {issue.status === 'Pending' ? '👤 Assign to Me' : '🔁 Reassign'}
                  </button>
                )}
                
                {/* Resolve Button */}
                {onResolve && (
                  <button
                    onClick={() => onResolve(issue.id)}
                    className={`px-4 py-2 text-sm rounded-md transition-colors flex-1 font-medium shadow-sm ${
                      issue.status === 'Pending' 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                    disabled={issue.status === 'Pending'}
                  >
                    {issue.status === 'Pending' ? '⏳ Assign First' : '✅ Mark Resolved'}
                  </button>
                )}
              </div>
              
              {issue.status === 'Pending' && (
                <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
                  ⚠️ This issue needs to be assigned before it can be resolved
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminIssueCard;