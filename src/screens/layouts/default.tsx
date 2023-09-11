const defaultLayout = ({ children }) => {
  return (
    <>
      <div className="container p-4 mx-auto">
        <div className="w-full p-4 bg-gray-100 rounded-lg shadow-lg">{children}</div>
      </div>
    </>
  );
};

export default defaultLayout;
