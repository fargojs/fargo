import useSWR from "swr";

import useQuery from "../hooks/useQuery";
import { useZoteraStore } from "../stores/useZoteraStore";

const fetcher = (url: string) => fetch(url).then(res => res.json());
export default function Extensions() {
  const { search } = useZoteraStore();
  const q = useQuery().get("q");

  const { data, error, isValidating, mutate } = useSWR("/-/extensions", fetcher);
  return (
    <div>
      {search}
      {q}
    </div>
  );
}
