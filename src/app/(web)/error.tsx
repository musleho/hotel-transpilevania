'use client';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
  return (
    <div className='container mx-auto'>
      <h2 className='font-heading text-tertiary-dark mb-10'>Something went wrong!</h2>

      <button onClick={() => reset()} className='btn-primary'>
        Try Again
      </button>
    </div>
  );
}

export default Error;
