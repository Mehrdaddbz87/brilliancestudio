import { ServiceDetailPage } from "@/components/service-detail-page";
import { servicePagesBySlug } from "@/lib/service-pages";

const service = servicePagesBySlug["home-additions"];

export default function HomeAdditionsPage() {
  return <ServiceDetailPage service={service} />;
}
