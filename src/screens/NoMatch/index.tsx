import { useLocation } from "react-router-dom";

export function NoMatchPage() {
  const { pathname } = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{pathname}</code>
      </h3>
    </div>
  );
}
