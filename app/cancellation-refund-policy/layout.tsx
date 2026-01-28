import Layout from "../components/(private)/Layout";
import Footer from "../components/widgets/Footer";

export default function CancellationRefundPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Layout isCancellationPolicyOnly={true} isReducedHeight={true} />
      <main>{children}</main>

    </div>
  );
}