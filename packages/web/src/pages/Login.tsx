import { useZoteraStore } from '../stores/useZoteraStore';

export default function Login() {
  const zotera = useZoteraStore();
  return <div>{JSON.stringify(zotera)}</div>;
}
