import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Search, FileText, Building } from "lucide-react"

export default function QuickActions() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button className="flex flex-col items-center gap-2">
          <PlusCircle className="h-6 w-6" />
          Add Internship
        </Button>
        <Button className="flex flex-col items-center gap-2" variant="secondary">
          <Search className="h-6 w-6" />
          Find Internships
        </Button>
        <Button className="flex flex-col items-center gap-2" variant="secondary">
          <FileText className="h-6 w-6" />
          Submit Report
        </Button>
        <Button className="flex flex-col items-center gap-2" variant="secondary">
          <Building className="h-6 w-6" />
          Add Company
        </Button>
      </CardContent>
    </Card>
  )
}

