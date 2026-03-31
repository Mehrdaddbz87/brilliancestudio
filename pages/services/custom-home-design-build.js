import { ServiceDetailPage } from "@/components/service-detail-page";
import { servicePagesBySlug } from "@/lib/service-pages";

const service = servicePagesBySlug["custom-home-design-build"];

export default function CustomHomeDesignBuildPage() {
  return <ServiceDetailPage service={service} />;
}
