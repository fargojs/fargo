interface ExtensionProps {
  name: string;
  version: string;
  author: string;
  description: string;
  license: string;
  homepage: string;
}

export default function Extension(props: Partial<ExtensionProps>) {
  const { name, version, author, description, homepage } = props;
  return <div>
    {JSON.stringify(props)}
  </div>;
}
