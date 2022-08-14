interface FooterProps {
  message: string;
  copyright: string;
}

export default function Footer({ message, copyright }: FooterProps) {
  return (
    <footer className="bg-[#264027]">
      <div className="max-w-7xl w-full mx-auto flex flex-col justify-center items-center h-[65px]">
        <p>{message}</p>
        <p>{copyright}</p>
      </div>
    </footer>
  );
}
