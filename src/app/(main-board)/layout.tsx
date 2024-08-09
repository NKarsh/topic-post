export default function MainBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="text-white flex-col mt-5">
        <div className="text-4xl font-bold w-full text-center">Topic Post</div>
        <div className="font-thin w-full text-center">
          write about any topic you want
        </div>
      </div>
      <div className="flex justify-center items-center mt-5 w-full p-6">
        {children}
      </div>
    </div>
  );
}
