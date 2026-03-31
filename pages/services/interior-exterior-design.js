import { ServiceDetailPage } from "@/components/service-detail-page";
import { servicePagesBySlug } from "@/lib/service-pages";

const service = servicePagesBySlug["interior-exterior-design"];

export default function InteriorExteriorDesignPage() {
  return <ServiceDetailPage service={service} />;
}
