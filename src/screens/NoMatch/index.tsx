import { useRouter } from "../../services/hooks/";

export function NoMatchPage() {
  const { location } = useRouter();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}
