import LoadingScreen from "@/components/common/LoadingScreen";
import AppRouter from "@/router";
import { useLoadingScreen } from "@/hooks/useLoadingScreen";

/** Root application component. */
export default function App() {
  const isLoading = useLoadingScreen();

  return (
    <>
      <LoadingScreen visible={isLoading} />
      <AppRouter />
    </>
  );
}
