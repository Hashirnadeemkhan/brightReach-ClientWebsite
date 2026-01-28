import Layout from "../components/(private)/Layout";
import Footer from "../components/widgets/Footer";

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Layout isAboutOnly={true} isReducedHeight={true} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}