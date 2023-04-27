"use client";

import Container from "./components/Container";
import Heading from "./components/Heading";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  return (
    <Container>
      <div className="mt-20 flex flex-col gap-8">
        <Heading title="Error" subtitle="Something went wrong" />
        <div>{error.message}</div>
      </div>
    </Container>
  );
};

export default ErrorState;
