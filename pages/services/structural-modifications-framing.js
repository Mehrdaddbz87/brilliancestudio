import { ServiceDetailPage } from "@/components/service-detail-page";
import { servicePagesBySlug } from "@/lib/service-pages";

const service = servicePagesBySlug["structural-modifications-framing"];

export default function StructuralModificationsFramingPage() {
  return <ServiceDetailPage service={service} />;
}
