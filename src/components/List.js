import ListItem from "./ListItem";

const mockData = [
    { id: 1, type: "Birthday Video", name: "John Doe",  date:'01/02/2025', status: "Accepted" },
    { id: 2, type: "Anniversary Video", name: "Jane Smith", date:'01/02/2025', status: "Pending" },
    { id: 3, type: "Birthday Video", name: "Alice Brown", date:'01/02/2025', status: "Rejected" },
    { id: 4, type: "Birthday Video", name: "Bob Johnson", date:'01/02/2025', status: "Accepted" },
    { id: 5, type: "Birthday Video", name: "Emma Wilson", date:'01/02/2025', status: "Pending" },
    { id: 6, type: "Birthday Video", name: "David Lee", date:'01/02/2025', status: "Accepted" },
    { id: 7, type: "Birthday Video", name: "Sophia Martin", date:'01/02/2025', status: "Pending" },
    { id: 8, type: "Birthday Video", name: "Olivia Clark", date:'01/02/2025', status: "Rejected" },
    { id: 9, type: "Birthday Video", name: "Mason Davis", date:'01/02/2025', status: "Accepted" },
    { id: 10, type: "Birthday Video", name: "Liam Harris", date:'01/02/2025', status: "Pending" },
    { id: 11, type: "Birthday Video", name: "Isabella Nelson", date:'01/02/2025', status: "Rejected" },
    { id: 12, type: "Birthday Video", name: "Lucas Adams", date:'01/02/2025', status: "Pending" },
    
];


export default function List(){
    return(
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
        <thead>
          <tr className="bg-stone-100">
          <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Request Type</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Preferred Date/Time</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Edit</th>
            <th className="px-4 py-2 text-left">Delete</th>
          </tr>
        </thead>
        <tbody className="overflow-y-auto">
            {mockData.slice(0, 7).map((item) => (
                <ListItem key={item.id} data={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
