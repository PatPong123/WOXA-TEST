import { Badge } from "@/components/ui/badge";

type StatusConfig = {
  label: string;
  className: string;
};

const statusMap: Record<string, StatusConfig> = {
  กำลังปลูก: {
    label: "กำลังปลูก",
    className: "bg-yellow-100 text-yellow-800 border-yellow-300",
  },
  ยืนยันจัดซื้อ: {
    label: "ยืนยันจัดซื้อ",
    className: "bg-blue-100 text-blue-800 border-blue-300",
  },
  รอการยืนยัน: {
    label: "รอการยืนยัน",
    className: "bg-red-100 text-red-800 border-red-300",
  },
  กำลังจัดส่ง: {
    label: "กำลังจัดส่ง",
    className: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
    รอการตรวจสอบ: {
    label: "รอการตรวจสอบ",
    className: "bg-gray-100 text-gray-800 border-gray-300",
  },
     เพาะเมล็ด: {
    label: "เพาะเมล็ด",
    className: "bg-orange-300 text-gray-800 border-gray-300",
  },
    พร้อมจัดส่ง: {
    label: "พร้อมจัดส่ง",
    className: "bg-green-white text-green-600 border-green-400",
  },
};

export function getStatusBadge(status: string) {
  const config = statusMap[status];

  return (
    <Badge variant="outline" className={config?.className}>
      {config?.label ?? status}
    </Badge>
  );
}
