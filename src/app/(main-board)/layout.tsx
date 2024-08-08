export default function MainBoardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div>
        {children}
      </div>
    );
  }