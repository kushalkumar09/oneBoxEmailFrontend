import { ThumbsUp, Calendar, X, AlertCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const categoryStyles = {
  "Interested": "bg-green-100 text-green-800 border-green-200",
  "Meeting Booked": "bg-blue-100 text-blue-800 border-blue-200",
  "Not Interested": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Spam": "bg-red-100 text-red-800 border-red-200",
  "Out of Office": "bg-purple-100 text-purple-800 border-purple-200",
  "Default": "bg-gray-100 text-gray-800 border-gray-200",
};

const categoryIcons = {
  "Interested": <ThumbsUp className="mr-1 h-3 w-3" />,
  "Meeting Booked": <Calendar className="mr-1 h-3 w-3" />,
  "Not Interested": <X className="mr-1 h-3 w-3" />,
  "Spam": <AlertCircle className="mr-1 h-3 w-3" />,
  "Out of Office": <Clock className="mr-1 h-3 w-3" />,
};

const CategoryBadge = ({ category }) => {
  return (
    <Badge variant="outline" className={`flex items-center ${categoryStyles[category] || categoryStyles["Default"]}`}>
      {categoryIcons[category] || null}
      {category}
    </Badge>
  );
};

export default CategoryBadge;
