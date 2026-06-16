import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import PageTransition from "./PageTransition";
import ScrollProgress from "@/components/common/ScrollProgress";
import BackToTop from "@/components/common/BackToTop";
import SkipLink from "@/components/common/SkipLink";
import CommandPalette from "@/components/common/CommandPalette";
import CustomCursor from "@/components/common/CustomCursor";
import { useScrollToHash } from "@/hooks/useScrollToHash";

/** Shared shell rendered around every route: nav, footer, and page chrome. */
export default function Layout() {
  useScrollToHash();
  const location = useLocation();

  return (
    <>
      <SkipLink />
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <CommandPalette />
      <main id="main-content">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
