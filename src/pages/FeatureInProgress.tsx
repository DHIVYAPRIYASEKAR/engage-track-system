
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

interface FeatureInProgressProps {
  feature: string;
}

const FeatureInProgress: React.FC<FeatureInProgressProps> = ({ feature }) => {
  return (
    <div className="container max-w-md mx-auto py-20 px-4 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/10 mb-6">
        <Clock className="h-8 w-8 text-brand" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Coming Soon</h1>
      <p className="text-muted-foreground mb-6">
        The {feature} feature is currently in development and will be available soon.
      </p>
      <Button asChild>
        <Link to="/">Back to Dashboard</Link>
      </Button>
    </div>
  );
};

export default FeatureInProgress;
