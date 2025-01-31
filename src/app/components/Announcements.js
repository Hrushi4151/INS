import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const announcements = [
  { id: 1, title: "Summer Internship Fair", date: "2023-06-15" },
  { id: 2, title: "Resume Workshop", date: "2023-06-20" },
  { id: 3, title: "Mock Interview Day", date: "2023-06-25" },
]

export default function Announcements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Announcements</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {announcements.map((announcement) => (
            <li key={announcement.id} className="border-b pb-2 last:border-b-0">
              <h3 className="font-semibold">{announcement.title}</h3>
              <p className="text-sm text-muted-foreground">{announcement.date}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

