interface FooterProps {
  message: string;
  copyright: string;
}

export default function Footer({ message, copyright }: FooterProps) {
  return (
    <footer>
      <div className="max-w-7xl w-full mx-auto flex flex-col justify-center items-center h-[65px] border-t border-t-neutral-300">
        <p>{message}</p>
        <p>{copyright}</p>
      </div>
    </footer>
  );
}
