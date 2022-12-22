export function BtnLinkPrimary({ children, ...restProps }: any) {
  return (
    <a
      className="font-bold rounded-full bg-red-600 inline-block py-2 px-4 text-white w-full text-center hover:bg-red-500 active:bg-red-400"
      {...restProps}
    >
      {children}
    </a>
  );
}
