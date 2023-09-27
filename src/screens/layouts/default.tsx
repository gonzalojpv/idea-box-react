// @ts-ignore
const defaultLayout = ({ children }) => {
  return (
    <>
      <div className="container p-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {children}
      </div>
    </>
  );
};

export default defaultLayout;
