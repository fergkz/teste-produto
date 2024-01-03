export default function PageTitle({ children }) {
  return (
    <h1 className="w-full pb-4 text-2xl font-semibold leading-tight text-gray-800">
      {children}
    </h1>
  );
}
