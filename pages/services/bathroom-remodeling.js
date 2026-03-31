import { ServiceDetailPage } from "@/components/service-detail-page";
import { servicePagesBySlug } from "@/lib/service-pages";

const service = servicePagesBySlug["bathroom-remodeling"];

export default function BathroomRemodelingPage() {
  return <ServiceDetailPage service={service} />;
}
