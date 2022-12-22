export function BtnSecondary({ children, ...restProps }: any) {
  return (
    <button
      type="button"
      className="font-bold rounded-full bg-slate-50 inline-block py-2 px-4 text-red-600 hover:text-white w-full text-center hover:bg-red-500 active:bg-red-400 border-red-600 border"
      {...restProps}
    >
      {children}
    </button>
  );
}
