import { getDoctors } from "@/lib/actions/doctors";
import DoctorsClient from "./doctors-client";

export const dynamic = "force-dynamic";

export default async function DoctorsPage() {
    const doctors = await getDoctors();
    return <DoctorsClient initialDoctors={doctors} />;
}
