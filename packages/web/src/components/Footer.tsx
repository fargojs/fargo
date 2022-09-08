interface FooterProps {
  message: string;
  copyright: string;
}

export default function Footer({ message, copyright }: FooterProps) {
  return (
    <footer>
      <div className="max-w-7xl w-full mx-auto text-center p-2 h-[65px] border-t border-gray-200 dark:border-gray-800">
        <p>{message}</p>
        <p>{copyright}</p>
      </div>
    </footer>
  );
}
