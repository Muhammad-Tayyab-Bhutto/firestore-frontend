
import { BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PlaceholderChartProps {
  title: string;
  description?: string;
  className?: string;
}

export function PlaceholderChart({ title, description, className }: PlaceholderChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="h-64 flex flex-col items-center justify-center bg-muted/30 rounded-b-lg text-center">
        <BarChart3 className="h-16 w-16 text-muted-foreground" />
        <p className="mt-4 text-sm text-muted-foreground">
          {description ? 'Data visualization will appear here.' : 'Chart will be displayed here.'}
        </p>
      </CardContent>
    </Card>
  );
}
