import { ServiceDetailPage } from "@/components/service-detail-page";
import { servicePagesBySlug } from "@/lib/service-pages";

const service = servicePagesBySlug["basement-finishing"];

export default function BasementFinishingPage() {
  return <ServiceDetailPage service={service} />;
}

