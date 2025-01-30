import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function ListItem({data}){
    return (
        <>
        <tr className="border-b border-gray-200 hover:bg-gray-100">
            <td className="px-4 py-2">{data.id}</td>
            <td className="px-4 py-2 font-bold">{data.type}</td>
            <td className="px-4 py-2">{data.name}</td>
            <td className="px-4 py-2">{data.date}</td>
            <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded text-white ${data.status === "Pending" ? "bg-yellow-500" : data.status === "Accepted" ? "bg-green-500" : "bg-red-500" }`}>
                {data.status}
                </span>
            </td>
            <td className="px-4 py-2">
                <a href="/request" className="hover:text-gray-400"><PencilIcon className="w-5 h-5 ml-2 text-stone-600" /></a>
            </td>
            <td className="px-4 py-2">
                <a href="" className="hover:text-gray-400">
                    <TrashIcon className="w-5 h-5 ml-2 text-red-500" />
                </a> 
            </td>
        </tr>
    </>
    );
}