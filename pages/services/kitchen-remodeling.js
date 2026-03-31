import { ServiceDetailPage } from "@/components/service-detail-page";
import { servicePagesBySlug } from "@/lib/service-pages";

const service = servicePagesBySlug["kitchen-remodeling"];

export default function KitchenRemodelingPage() {
  return <ServiceDetailPage service={service} />;
}
