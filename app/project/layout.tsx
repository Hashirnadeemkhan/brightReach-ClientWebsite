import Layout from "../components/(private)/Layout";
import Footer from "../components/widgets/Footer";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Layout isProjectOnly={true} isReducedHeight={true} />
      <main>{children}</main>
  
    </div>
  );
}