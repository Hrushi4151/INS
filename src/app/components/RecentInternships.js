import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentInternships = [
  { id: 1, position: "Software Developer", company: "Tech Corp", deadline: "2023-07-15" },
  { id: 2, position: "Data Analyst", company: "Data Insights", deadline: "2023-07-20" },
  { id: 3, position: "UX Designer", company: "Design Co", deadline: "2023-07-25" },
  { id: 4, position: "Marketing Intern", company: "Brand Builders", deadline: "2023-07-30" },
]

export default function RecentInternships() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Internships</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Position</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Application Deadline</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentInternships.map((internship) => (
              <TableRow key={internship.id}>
                <TableCell>{internship.position}</TableCell>
                <TableCell>{internship.company}</TableCell>
                <TableCell>{internship.deadline}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

