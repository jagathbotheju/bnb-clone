"use client";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="w-full px-4 sm:px-2 md:px-10 xl:px-20 mx-auto max-w-full">
      {children}
    </div>
  );
};

export default Container;
