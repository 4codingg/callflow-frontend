import Link from 'next/link';

const IndexPage = () => (
  <div className="flex items-center w-full h-[100vh] justify-center z-[70]">
    <Link href="/dashboard">Go to dashboard</Link>
  </div>
);

export default IndexPage;
