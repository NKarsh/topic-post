export default function MainBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center items-center mt-20 w-full p-6">
      {children}
    </div>
  );
}
